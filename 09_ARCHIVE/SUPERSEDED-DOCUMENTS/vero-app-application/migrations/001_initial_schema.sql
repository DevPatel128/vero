-- ============================================================
-- VERO — Initial Schema (Phase 1)
-- Run this against your Supabase project via SQL Editor or CLI.
-- DPDP Act 2023 compliant: soft deletes, audit logs, consent tracking.
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum ('worker', 'business', 'admin', 'moderator');
create type verification_tier as enum ('unverified', 'basic', 'verified', 'premium');
create type booking_status as enum (
  'pending', 'accepted', 'in_progress', 'submitted',
  'completed', 'disputed', 'cancelled'
);
create type payment_status as enum ('held', 'released', 'refunded', 'disputed');
create type dispute_tier as enum ('direct', 'mediated', 'reviewed');
create type dispute_status as enum ('open', 'resolved', 'escalated');

-- ============================================================
-- USERS (auth + identity core)
-- ============================================================

create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text,
  phone text unique,
  email_verified boolean default false,
  phone_verified boolean default false,
  role user_role not null default 'worker',
  verification_tier verification_tier not null default 'unverified',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index users_email_idx on users(email) where deleted_at is null;
create index users_phone_idx on users(phone) where deleted_at is null;

-- ============================================================
-- PROFILES (public-facing identity)
-- ============================================================

create table profiles (
  user_id uuid primary key references users(id) on delete cascade,
  full_name text not null,
  display_name text,
  bio text,
  avatar_url text,
  city text,
  zone text,
  career_path text,
  skills text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_career_path_idx on profiles(career_path);
create index profiles_city_zone_idx on profiles(city, zone);

-- ============================================================
-- CAREER PATHS (canonical category list)
-- ============================================================

create table career_paths (
  slug text primary key,
  category text not null,
  label text not null,
  description text,
  active boolean default true
);

insert into career_paths (slug, category, label) values
  ('home-chef', 'culinary', 'Home Chef'),
  ('baker', 'culinary', 'Baker'),
  ('meal-prep', 'culinary', 'Meal Prep Assistant'),
  ('catering', 'culinary', 'Catering Assistant'),
  ('photographer', 'creative', 'Photographer'),
  ('videographer', 'creative', 'Videographer'),
  ('video-editor', 'creative', 'Video Editor'),
  ('graphic-designer', 'creative', 'Graphic Designer'),
  ('personal-assistant', 'family', 'Personal Assistant'),
  ('household-coordinator', 'family', 'Household Coordinator'),
  ('cleaning-specialist', 'family', 'Deep Cleaning Specialist'),
  ('kitchen-support', 'family', 'Kitchen Support'),
  ('store-assistant', 'ops', 'Store Assistant'),
  ('admin-support', 'ops', 'Admin Support'),
  ('event-support', 'ops', 'Event Support'),
  ('inventory-assistant', 'ops', 'Inventory Assistant'),
  ('fitness-coach', 'fitness', 'Fitness Coach'),
  ('personal-trainer', 'fitness', 'Personal Trainer Assistant'),
  ('yoga-assistant', 'fitness', 'Yoga Assistant'),
  ('group-workout', 'fitness', 'Group Workout Assistant'),
  ('event-setup', 'events', 'Event Setup'),
  ('event-coordination', 'events', 'Event Coordination'),
  ('venue-ops', 'events', 'Venue Operations'),
  ('guest-management', 'events', 'Guest Management');

-- ============================================================
-- CITIES (Phase 1 zones)
-- ============================================================

create table cities (
  slug text primary key,
  name text not null,
  state text not null,
  country text not null default 'IN',
  zones text[] not null default '{}',
  active boolean default true
);

insert into cities (slug, name, state, zones) values
  ('bengaluru', 'Bengaluru', 'Karnataka',
   array['whitefield', 'hsr-layout', 'koramangala', 'sarjapur', 'electronic-city']);

-- ============================================================
-- OPPORTUNITIES (jobs posted by businesses)
-- ============================================================

create table opportunities (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text not null,
  career_path text references career_paths(slug),
  city text references cities(slug),
  zone text,
  pay_type text check (pay_type in ('fixed', 'day_rate', 'hourly')),
  pay_amount_paise bigint,
  starts_at timestamptz,
  deadline timestamptz,
  is_open boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index opportunities_open_idx on opportunities(is_open, city, career_path)
  where deleted_at is null;

-- ============================================================
-- BOOKINGS (worker accepted, both sides committed)
-- ============================================================

create table bookings (
  id uuid primary key default uuid_generate_v4(),
  opportunity_id uuid not null references opportunities(id),
  worker_id uuid not null references users(id),
  business_id uuid not null references users(id),
  scope text not null,
  pay_amount_paise bigint not null,
  status booking_status not null default 'pending',
  worker_signed_at timestamptz,
  business_signed_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index bookings_worker_idx on bookings(worker_id, status);
create index bookings_business_idx on bookings(business_id, status);

-- ============================================================
-- PAYMENTS (Razorpay escrow records)
-- ============================================================

create table payments (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid unique not null references bookings(id),
  razorpay_payment_id text unique,
  razorpay_order_id text unique,
  amount_paise bigint not null,
  status payment_status not null default 'held',
  held_at timestamptz,
  released_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- REVIEWS (post-completion, dual-direction)
-- ============================================================

create table reviews (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references bookings(id),
  author_id uuid not null references users(id),
  subject_id uuid not null references users(id),
  rating int check (rating between 1 and 5),
  text text,
  created_at timestamptz not null default now(),
  unique (booking_id, author_id)
);

-- ============================================================
-- MESSAGES (in-job thread)
-- ============================================================

create table messages (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references bookings(id) on delete cascade,
  author_id uuid not null references users(id),
  body text not null,
  created_at timestamptz not null default now()
);

create index messages_booking_idx on messages(booking_id, created_at);

-- ============================================================
-- VERIFICATIONS (identity tier upgrades)
-- ============================================================

create table verifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null check (type in ('email', 'phone', 'gov_id', 'gst', 'address')),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  reviewer_id uuid references users(id),
  evidence_url text,
  notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

-- ============================================================
-- TRUST SCORES (ALVED — multi-signal trust)
-- ============================================================

create table trust_scores (
  user_id uuid primary key references users(id) on delete cascade,
  completion_rate numeric(5,4),
  punctuality_score numeric(5,4),
  repeat_client_rate numeric(5,4),
  dispute_rate numeric(5,4),
  endorsement_weight numeric(5,4),
  consistency_score numeric(5,4),
  signed_jobs_count int not null default 0,
  computed_at timestamptz not null default now()
);

-- ============================================================
-- PORTFOLIO ITEMS
-- ============================================================

create table portfolio_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text,
  media_url text not null,
  media_type text check (media_type in ('image', 'video', 'document', 'link')),
  related_booking_id uuid references bookings(id),
  is_verified boolean default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- DISPUTES (3-tier resolution)
-- ============================================================

create table dispute_cases (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references bookings(id),
  raised_by uuid not null references users(id),
  reason text not null,
  tier dispute_tier not null default 'direct',
  status dispute_status not null default 'open',
  evidence_urls text[],
  reviewer_id uuid references users(id),
  decision text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- ============================================================
-- REFERRALS
-- ============================================================

create table referrals (
  id uuid primary key default uuid_generate_v4(),
  referrer_id uuid not null references users(id),
  referred_id uuid unique not null references users(id),
  status text default 'pending' check (status in ('pending', 'activated', 'completed')),
  activated_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- BADGES (earned via real completions)
-- ============================================================

create table badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  slug text not null,
  label text not null,
  earned_at timestamptz not null default now(),
  unique (user_id, slug)
);

-- ============================================================
-- AMBASSADOR PROFILES
-- ============================================================

create table ambassador_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  campus text,
  city text references cities(slug),
  cohort text,
  status text default 'active' check (status in ('active', 'inactive', 'suspended')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  link_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_unread_idx on notifications(user_id, created_at)
  where read_at is null;

-- ============================================================
-- AUDIT LOGS (DPDP Act — 7 year retention, permanent)
-- ============================================================

create table audit_logs (
  id bigserial primary key,
  user_id uuid references users(id),
  actor_id uuid references users(id),
  action text not null,
  resource_type text,
  resource_id text,
  ip_address inet,
  user_agent text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index audit_logs_user_idx on audit_logs(user_id, created_at);
create index audit_logs_action_idx on audit_logs(action, created_at);

-- ============================================================
-- USER CONSENTS (DPDP Article 5)
-- ============================================================

create table user_consents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  consent_type text not null,
  version text not null,
  granted boolean not null,
  ip_address inet,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index user_consents_user_idx on user_consents(user_id, consent_type);

-- ============================================================
-- REFRESH TOKENS (revocation support)
-- ============================================================

create table refresh_tokens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  token_hash text unique not null,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index refresh_tokens_user_idx on refresh_tokens(user_id)
  where revoked_at is null;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table users enable row level security;
alter table profiles enable row level security;
alter table opportunities enable row level security;
alter table bookings enable row level security;
alter table payments enable row level security;
alter table reviews enable row level security;
alter table messages enable row level security;
alter table verifications enable row level security;
alter table trust_scores enable row level security;
alter table portfolio_items enable row level security;
alter table dispute_cases enable row level security;
alter table referrals enable row level security;
alter table badges enable row level security;
alter table ambassador_profiles enable row level security;
alter table notifications enable row level security;
alter table audit_logs enable row level security;
alter table user_consents enable row level security;
alter table refresh_tokens enable row level security;

-- Users see only themselves
create policy users_self_read on users
  for select using (auth.uid() = id);
create policy users_self_update on users
  for update using (auth.uid() = id);

-- Profiles are publicly readable (workers' public records)
create policy profiles_public_read on profiles for select using (true);
create policy profiles_self_write on profiles
  for all using (auth.uid() = user_id);

-- Opportunities: businesses own theirs, everyone can browse open ones
create policy opportunities_open_read on opportunities
  for select using (is_open = true and deleted_at is null);
create policy opportunities_owner_all on opportunities
  for all using (auth.uid() = business_id);

-- Bookings: only the two parties
create policy bookings_parties_read on bookings
  for select using (auth.uid() in (worker_id, business_id));
create policy bookings_parties_write on bookings
  for update using (auth.uid() in (worker_id, business_id));

-- Payments: only the booking parties
create policy payments_parties_read on payments
  for select using (
    auth.uid() in (
      select worker_id from bookings where id = booking_id
      union
      select business_id from bookings where id = booking_id
    )
  );

-- Messages: only thread participants
create policy messages_parties_read on messages
  for select using (
    auth.uid() in (
      select worker_id from bookings where id = booking_id
      union
      select business_id from bookings where id = booking_id
    )
  );
create policy messages_parties_write on messages
  for insert with check (
    auth.uid() = author_id and auth.uid() in (
      select worker_id from bookings where id = booking_id
      union
      select business_id from bookings where id = booking_id
    )
  );

-- Portfolio: public read, owner write
create policy portfolio_public_read on portfolio_items for select using (true);
create policy portfolio_owner_write on portfolio_items
  for all using (auth.uid() = user_id);

-- Trust scores: public read (transparency)
create policy trust_public_read on trust_scores for select using (true);

-- Verifications: only the user
create policy verifications_self_read on verifications
  for select using (auth.uid() = user_id);

-- Notifications: only the user
create policy notifications_self_read on notifications
  for select using (auth.uid() = user_id);
create policy notifications_self_update on notifications
  for update using (auth.uid() = user_id);

-- Audit logs: never readable by users (admin-only via service role)
-- (no select policy = no row visible to authenticated users)

-- Consents: only the user
create policy consents_self_read on user_consents
  for select using (auth.uid() = user_id);

-- Refresh tokens: only the user (writes go through service role)
create policy refresh_tokens_self_read on refresh_tokens
  for select using (auth.uid() = user_id);

-- ============================================================
-- UPDATED_AT triggers
-- ============================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_updated_at before update on users
  for each row execute function set_updated_at();
create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger opportunities_updated_at before update on opportunities
  for each row execute function set_updated_at();
create trigger bookings_updated_at before update on bookings
  for each row execute function set_updated_at();
