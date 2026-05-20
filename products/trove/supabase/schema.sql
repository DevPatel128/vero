-- =========================================================
-- Trove — Production schema
-- PostgreSQL 15+ on Supabase
-- All tables: RLS enabled, anon revoked, authenticated granted
-- =========================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- =========================================================
-- profiles — public profile keyed to auth.users
-- =========================================================
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         citext not null unique,
  full_name     text,
  avatar_url    text,
  locale        text not null default 'en-US',
  currency      char(3) not null default 'USD',
  timezone      text not null default 'UTC',
  onboarding_complete boolean not null default false,
  role          text not null default 'user' check (role in ('user', 'admin', 'owner')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_profiles_role on public.profiles(role);

-- =========================================================
-- accounts — bank/credit/investment accounts
-- =========================================================
create table if not exists public.accounts (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references public.profiles(id) on delete cascade,
  name              text not null,
  institution       text,
  type              text not null check (type in ('checking','savings','credit','investment','loan','cash','other')),
  currency          char(3) not null default 'USD',
  balance           numeric(14,2) not null default 0,
  mask              text,
  plaid_account_id  text,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists idx_accounts_user on public.accounts(user_id);
create index if not exists idx_accounts_active on public.accounts(user_id, is_active);

-- =========================================================
-- transactions
-- =========================================================
create table if not exists public.transactions (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  account_id    uuid references public.accounts(id) on delete set null,
  amount        numeric(14,2) not null check (amount >= 0),
  currency      char(3) not null default 'USD',
  merchant      text not null,
  description   text,
  category      text not null,
  subcategory   text,
  direction     text not null check (direction in ('debit','credit')),
  status        text not null default 'posted' check (status in ('posted','pending')),
  is_recurring  boolean not null default false,
  is_transfer   boolean not null default false,
  tags          text[] not null default array[]::text[],
  notes         text,
  occurred_at   timestamptz not null,
  posted_at     timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_transactions_user_occurred on public.transactions(user_id, occurred_at desc);
create index if not exists idx_transactions_user_category on public.transactions(user_id, category);
create index if not exists idx_transactions_user_merchant on public.transactions(user_id, lower(merchant));
create index if not exists idx_transactions_recurring on public.transactions(user_id, is_recurring) where is_recurring;

-- =========================================================
-- subscriptions (recurring spend tracker)
-- =========================================================
create table if not exists public.subscriptions (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  merchant      text not null,
  amount        numeric(14,2) not null,
  currency      char(3) not null default 'USD',
  cadence       text not null check (cadence in ('weekly','monthly','quarterly','yearly','custom')),
  next_renewal  date,
  category      text not null,
  status        text not null default 'active' check (status in ('active','paused','cancelled')),
  first_seen_at timestamptz not null default now(),
  last_charge_at timestamptz,
  confidence    numeric(3,2) not null default 1.00 check (confidence between 0 and 1),
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_subscriptions_user on public.subscriptions(user_id, status);
create index if not exists idx_subscriptions_renewal on public.subscriptions(next_renewal) where status = 'active';

-- =========================================================
-- budgets
-- =========================================================
create table if not exists public.budgets (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  name        text not null,
  category    text not null,
  amount      numeric(14,2) not null check (amount >= 0),
  period      text not null check (period in ('weekly','monthly','quarterly','yearly')),
  rollover    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists idx_budgets_user on public.budgets(user_id);

-- =========================================================
-- goals
-- =========================================================
create table if not exists public.goals (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  name            text not null,
  target_amount   numeric(14,2) not null check (target_amount > 0),
  current_amount  numeric(14,2) not null default 0,
  currency        char(3) not null default 'USD',
  target_date     date,
  category        text,
  status          text not null default 'active' check (status in ('active','achieved','abandoned')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists idx_goals_user on public.goals(user_id, status);

-- =========================================================
-- monthly_income
-- =========================================================
create table if not exists public.monthly_income (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  amount      numeric(14,2) not null check (amount >= 0),
  source      text,
  month       date not null,
  created_at  timestamptz not null default now(),
  unique (user_id, month)
);
create index if not exists idx_monthly_income_user_month on public.monthly_income(user_id, month desc);

-- =========================================================
-- insights — AI-generated summaries, cached
-- =========================================================
create table if not exists public.insights (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  kind          text not null,
  payload       jsonb not null,
  window_start  timestamptz not null,
  window_end    timestamptz not null,
  generated_at  timestamptz not null default now()
);
create index if not exists idx_insights_user_kind on public.insights(user_id, kind, generated_at desc);

-- =========================================================
-- notifications
-- =========================================================
create table if not exists public.notifications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  kind        text not null,
  title       text not null,
  body        text,
  href        text,
  read_at     timestamptz,
  created_at  timestamptz not null default now()
);
create index if not exists idx_notifications_user_unread on public.notifications(user_id, created_at desc) where read_at is null;

-- =========================================================
-- audit_logs
-- =========================================================
create table if not exists public.audit_logs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references public.profiles(id) on delete set null,
  actor_role    text,
  action        text not null,
  resource_type text not null,
  resource_id   text,
  metadata      jsonb not null default '{}'::jsonb,
  ip            inet,
  user_agent    text,
  created_at    timestamptz not null default now()
);
create index if not exists idx_audit_user on public.audit_logs(user_id, created_at desc);
create index if not exists idx_audit_resource on public.audit_logs(resource_type, resource_id);

-- =========================================================
-- api_keys
-- =========================================================
create table if not exists public.api_keys (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  name        text not null,
  key_prefix  text not null,
  key_hash    text not null,
  scopes      text[] not null default array['read']::text[],
  last_used_at timestamptz,
  revoked_at  timestamptz,
  created_at  timestamptz not null default now()
);
create unique index if not exists idx_api_keys_prefix on public.api_keys(key_prefix);
create index if not exists idx_api_keys_user on public.api_keys(user_id) where revoked_at is null;

-- =========================================================
-- teams + team_members
-- =========================================================
create table if not exists public.teams (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  plan        text not null default 'free',
  created_at  timestamptz not null default now()
);

create table if not exists public.team_members (
  id          uuid primary key default uuid_generate_v4(),
  team_id     uuid not null references public.teams(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  role        text not null check (role in ('owner','admin','member','viewer')),
  invited_at  timestamptz not null default now(),
  joined_at   timestamptz,
  unique (team_id, user_id)
);
create index if not exists idx_team_members_user on public.team_members(user_id);

-- =========================================================
-- subscriptions_billing (Stripe state)
-- =========================================================
create table if not exists public.subscriptions_billing (
  id                          uuid primary key default uuid_generate_v4(),
  user_id                     uuid not null references public.profiles(id) on delete cascade unique,
  razorpay_customer_id        text unique,
  razorpay_subscription_id    text unique,
  plan                        text not null default 'free' check (plan in ('free','pro','team')),
  status                      text not null default 'inactive',
  current_period_end          timestamptz,
  cancel_at_period_end        boolean not null default false,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

-- =========================================================
-- feature_flags
-- =========================================================
create table if not exists public.feature_flags (
  id          uuid primary key default uuid_generate_v4(),
  key         text not null unique,
  description text,
  enabled     boolean not null default false,
  rollout_pct numeric(5,2) not null default 0 check (rollout_pct between 0 and 100),
  allowlist   uuid[] not null default array[]::uuid[],
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- =========================================================
-- support_tickets
-- =========================================================
create table if not exists public.support_tickets (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete set null,
  subject     text not null,
  body        text not null,
  status      text not null default 'open' check (status in ('open','in_progress','resolved','closed')),
  priority    text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists idx_tickets_status on public.support_tickets(status, created_at desc);

-- =========================================================
-- Triggers: updated_at
-- =========================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  for t in select unnest(array[
    'profiles','accounts','transactions','subscriptions','budgets','goals',
    'subscriptions_billing','feature_flags','support_tickets'
  ]) loop
    execute format('drop trigger if exists trg_%I_updated on public.%I', t, t);
    execute format('create trigger trg_%I_updated before update on public.%I for each row execute function public.set_updated_at()', t, t);
  end loop;
end $$;

-- =========================================================
-- Profile auto-provision on signup
-- =========================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.subscriptions_billing (user_id, plan, status)
  values (new.id, 'free', 'active')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- Financial Health Score (0–100)
-- Combines: Savings Efficiency, Growth vs Consumption, Budget adherence
-- =========================================================
create or replace function public.financial_health_score(p_user_id uuid)
returns numeric
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total_expense numeric;
  v_growth_spend  numeric;
  v_consumption   numeric;
  v_savings_eff   numeric;
  v_growth_ratio  numeric;
  v_score         numeric;
begin
  select coalesce(sum(amount), 0) into v_total_expense
  from transactions
  where user_id = p_user_id and direction = 'debit' and occurred_at > now() - interval '30 days';

  if v_total_expense = 0 then return 50; end if;

  select coalesce(sum(amount), 0) into v_growth_spend
  from transactions
  where user_id = p_user_id and direction = 'debit'
    and category in ('Investments','Education','Health')
    and occurred_at > now() - interval '30 days';

  select coalesce(sum(amount), 0) into v_consumption
  from transactions
  where user_id = p_user_id and direction = 'debit'
    and category in ('Food','Leisure','Travel','Utilities')
    and occurred_at > now() - interval '30 days';

  v_savings_eff := v_growth_spend / v_total_expense * 100;
  v_growth_ratio := case when v_consumption = 0 then 1 else v_growth_spend / v_consumption end;

  v_score := least(100, greatest(0, (v_savings_eff * 0.6) + (least(v_growth_ratio, 1) * 40)));
  return round(v_score, 1);
end;
$$;

-- =========================================================
-- Row Level Security
-- =========================================================
alter table public.profiles               enable row level security;
alter table public.accounts               enable row level security;
alter table public.transactions           enable row level security;
alter table public.subscriptions          enable row level security;
alter table public.budgets                enable row level security;
alter table public.goals                  enable row level security;
alter table public.monthly_income         enable row level security;
alter table public.insights               enable row level security;
alter table public.notifications          enable row level security;
alter table public.audit_logs             enable row level security;
alter table public.api_keys               enable row level security;
alter table public.teams                  enable row level security;
alter table public.team_members           enable row level security;
alter table public.subscriptions_billing  enable row level security;
alter table public.feature_flags          enable row level security;
alter table public.support_tickets        enable row level security;

-- Revoke anon, grant authenticated
revoke all on all tables in schema public from anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage on schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Policies: own-row pattern (auth.uid() = user_id)
do $$
declare t text;
begin
  for t in select unnest(array[
    'accounts','transactions','subscriptions','budgets','goals','monthly_income',
    'insights','notifications','api_keys','subscriptions_billing'
  ]) loop
    execute format('drop policy if exists "own row select" on public.%I', t);
    execute format('drop policy if exists "own row insert" on public.%I', t);
    execute format('drop policy if exists "own row update" on public.%I', t);
    execute format('drop policy if exists "own row delete" on public.%I', t);
    execute format('create policy "own row select" on public.%I for select using (auth.uid() = user_id)', t);
    execute format('create policy "own row insert" on public.%I for insert with check (auth.uid() = user_id)', t);
    execute format('create policy "own row update" on public.%I for update using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
    execute format('create policy "own row delete" on public.%I for delete using (auth.uid() = user_id)', t);
  end loop;
end $$;

-- profiles: self-read, self-update; admins see all
drop policy if exists "profiles self read"   on public.profiles;
drop policy if exists "profiles self update" on public.profiles;
drop policy if exists "profiles admin all"   on public.profiles;
create policy "profiles self read"   on public.profiles for select using (auth.uid() = id);
create policy "profiles self update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles admin all"   on public.profiles for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','owner')));

-- audit_logs: read by owner only; insert system-side via service role
drop policy if exists "audit user read" on public.audit_logs;
create policy "audit user read" on public.audit_logs for select using (auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','owner')));

-- teams + members
drop policy if exists "team owner read" on public.teams;
drop policy if exists "team member read" on public.team_members;
create policy "team owner read" on public.teams for select using (auth.uid() = owner_id or exists (select 1 from public.team_members tm where tm.team_id = teams.id and tm.user_id = auth.uid()));
create policy "team member read" on public.team_members for select using (auth.uid() = user_id or exists (select 1 from public.team_members tm where tm.team_id = team_members.team_id and tm.user_id = auth.uid()));

-- support_tickets: read own
drop policy if exists "ticket self" on public.support_tickets;
create policy "ticket self" on public.support_tickets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- feature_flags: read-only to authenticated
drop policy if exists "flags read" on public.feature_flags;
create policy "flags read" on public.feature_flags for select using (true);
