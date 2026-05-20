-- Trove seed data — demo accounts for development only
-- Run after schema.sql. Replace user IDs with real auth.uid() values from your Supabase project.

insert into public.feature_flags (key, description, enabled, rollout_pct) values
  ('ai_insights',         'AI-generated financial insights',        true,  100),
  ('plaid_linking',       'Connect bank accounts via Plaid',        false, 0),
  ('team_workspaces',     'Shared team workspaces',                 false, 10),
  ('export_pdf',          'PDF report exports',                     true,  100),
  ('mobile_pwa_install',  'Show PWA install prompt on mobile',      true,  100)
on conflict (key) do nothing;
