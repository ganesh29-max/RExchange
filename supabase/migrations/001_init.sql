-- Enable pgvector extension
create extension if not exists vector;

-- Profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  full_name text not null,
  avatar_url text,
  college text not null default 'University Campus',
  major text default 'Undeclared',
  graduation_year text default '2026',
  bio text default '',
  rating numeric(3, 2) default 5.00,
  review_count integer default 0,
  exchanges_completed integer default 0,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Listings table
create table if not exists public.listings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  type text not null check (type in ('item', 'service', 'opportunity', 'notes')),
  category text not null,
  tags text[] default array[]::text[],
  price numeric(10, 2) default 0.00,
  exchange_type text not null check (exchange_type in ('sell', 'swap', 'free', 'offer', 'request', 'share', 'claim')),
  status text not null default 'available' check (status in ('available', 'reserved', 'completed')),
  condition text check (condition in ('Brand New', 'Like New', 'Good', 'Fair')),
  location text not null default 'Main Campus Quad',
  is_request boolean default false,
  images text[] default array[]::text[],
  extra_details jsonb default '{}'::jsonb,
  embedding vector(768),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for semantic vector search
create index if not exists listings_embedding_idx on public.listings using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Claims / Reservations table
create table if not exists public.claims (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  claimer_id uuid references public.profiles(id) on delete cascade not null,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'completed')),
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Conversations table
create table if not exists public.conversations (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  participant_ids uuid[] not null,
  last_message text,
  last_message_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reviews table
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  reviewer_id uuid references public.profiles(id) on delete cascade not null,
  reviewee_id uuid references public.profiles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.claims enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;

-- Public Profiles: readable by all, editable by owner
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Listings: readable by all, writable by owner
create policy "Listings are viewable by everyone." on public.listings for select using (true);
create policy "Users can insert own listings." on public.listings for insert with check (auth.uid() = user_id);
create policy "Users can update own listings." on public.listings for update using (auth.uid() = user_id);
create policy "Users can delete own listings." on public.listings for delete using (auth.uid() = user_id);

-- Conversations & Messages: only participants can view/send
create policy "Participants can view conversations." on public.conversations for select using (auth.uid() = any(participant_ids));
create policy "Participants can view messages." on public.messages for select using (
  exists (
    select 1 from public.conversations
    where id = messages.conversation_id and auth.uid() = any(participant_ids)
  )
);
create policy "Participants can insert messages." on public.messages for insert with check (
  exists (
    select 1 from public.conversations
    where id = messages.conversation_id and auth.uid() = any(participant_ids)
  ) and auth.uid() = sender_id
);

-- Reviews: viewable by all, insertable by verified exchange participant
create policy "Reviews are viewable by everyone." on public.reviews for select using (true);
create policy "Users can insert reviews." on public.reviews for insert with check (auth.uid() = reviewer_id);
