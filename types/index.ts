export type ListingType = 'item' | 'service' | 'opportunity' | 'notes';

export type ExchangeType = 'sell' | 'swap' | 'free' | 'offer' | 'request' | 'share' | 'claim';

export type ListingStatus = 'available' | 'reserved' | 'completed';

export type ConditionType = 'Brand New' | 'Like New' | 'Good' | 'Fair';

export interface ListingExtraDetails {
  subject_code?: string;
  semester?: string;
  professor?: string;
  hourly_rate?: number;
  deadline?: string;
  organization?: string;
}

export interface Listing {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  user_college: string;
  user_rating: number;
  title: string;
  description: string;
  type: ListingType;
  category: string;
  tags: string[];
  price: number;
  exchange_type: ExchangeType;
  status: ListingStatus;
  condition?: ConditionType;
  location: string;
  is_request: boolean;
  images: string[];
  embedding?: number[];
  extra_details?: ListingExtraDetails;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  college: string;
  major: string;
  graduation_year: string;
  bio: string;
  rating: number;
  review_count: number;
  exchanges_completed: number;
  is_verified: boolean;
  saved_listing_ids: string[];
  created_at: string;
}

export interface Claim {
  id: string;
  listing_id: string;
  listing_title: string;
  claimer_id: string;
  claimer_name: string;
  claimer_avatar: string;
  owner_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  listing_id: string;
  listing_title: string;
  listing_price: number;
  listing_image: string;
  participant_ids: string[];
  other_user: {
    id: string;
    name: string;
    avatar: string;
    college: string;
  };
  last_message: string;
  last_message_at: string;
  unread: boolean;
}

export interface Review {
  id: string;
  listing_id: string;
  listing_title: string;
  reviewer_id: string;
  reviewer_name: string;
  reviewer_avatar: string;
  reviewee_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface SmartMatch {
  listing: Listing;
  matched_listing: Listing;
  similarity_score: number; // 0 - 100
  reason: string;
}

export interface AISuggestionResponse {
  title: string;
  type: ListingType;
  category: string;
  tags: string[];
  suggested_price: number;
  exchange_type: ExchangeType;
  condition?: ConditionType;
  location?: string;
  is_request: boolean;
  confidence: number;
  source: 'ollama' | 'fallback';
}
