-- Seed profiles
insert into public.profiles (id, email, full_name, avatar_url, college, major, graduation_year, bio, rating, review_count, exchanges_completed, is_verified)
values
  ('11111111-1111-1111-1111-111111111111', 'alex.chen@campus.edu', 'Alex Chen', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', 'Engineering Campus', 'Computer Science', '2026', 'Junior CS student passionate about systems and hardware. Happy to help peers!', 4.95, 14, 18, true),
  ('22222222-2222-2222-2222-222222222222', 'sarah.j@campus.edu', 'Sarah Jenkins', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', 'Science & Arts College', 'Bioengineering', '2025', 'Senior pre-med. Exchanging organic chemistry textbooks and dorm supplies.', 4.88, 11, 15, true),
  ('33333333-3333-3333-3333-333333333333', 'marcus.b@campus.edu', 'Marcus Brody', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', 'Business School', 'Finance & Econ', '2026', 'Finance sophomore offering math tutoring and event passes.', 5.00, 8, 10, true)
on conflict (id) do nothing;
