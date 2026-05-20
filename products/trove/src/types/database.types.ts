/**
 * Database schema types. Mirrors supabase/schema.sql.
 * Regenerate with `npm run db:types` after schema changes.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          locale: string;
          currency: string;
          timezone: string;
          onboarding_complete: boolean;
          role: "user" | "admin" | "owner";
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string; email: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      accounts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          institution: string | null;
          type: "checking" | "savings" | "credit" | "investment" | "loan" | "cash" | "other";
          currency: string;
          balance: number;
          mask: string | null;
          plaid_account_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["accounts"]["Row"]> & { user_id: string; name: string; type: Database["public"]["Tables"]["accounts"]["Row"]["type"] };
        Update: Partial<Database["public"]["Tables"]["accounts"]["Row"]>;
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          account_id: string | null;
          amount: number;
          currency: string;
          merchant: string;
          description: string | null;
          category: string;
          subcategory: string | null;
          direction: "debit" | "credit";
          status: "posted" | "pending";
          is_recurring: boolean;
          is_transfer: boolean;
          tags: string[];
          notes: string | null;
          occurred_at: string;
          posted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["transactions"]["Row"]> & { user_id: string; merchant: string; amount: number; category: string; direction: "debit" | "credit"; occurred_at: string };
        Update: Partial<Database["public"]["Tables"]["transactions"]["Row"]>;
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          merchant: string;
          amount: number;
          currency: string;
          cadence: "weekly" | "monthly" | "quarterly" | "yearly" | "custom";
          next_renewal: string | null;
          category: string;
          status: "active" | "paused" | "cancelled";
          first_seen_at: string;
          last_charge_at: string | null;
          confidence: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["subscriptions"]["Row"]> & { user_id: string; merchant: string; amount: number; cadence: Database["public"]["Tables"]["subscriptions"]["Row"]["cadence"]; category: string };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Row"]>;
      };
      budgets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category: string;
          amount: number;
          period: "weekly" | "monthly" | "quarterly" | "yearly";
          rollover: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["budgets"]["Row"]> & { user_id: string; name: string; category: string; amount: number; period: Database["public"]["Tables"]["budgets"]["Row"]["period"] };
        Update: Partial<Database["public"]["Tables"]["budgets"]["Row"]>;
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          target_amount: number;
          current_amount: number;
          currency: string;
          target_date: string | null;
          category: string | null;
          status: "active" | "achieved" | "abandoned";
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["goals"]["Row"]> & { user_id: string; name: string; target_amount: number };
        Update: Partial<Database["public"]["Tables"]["goals"]["Row"]>;
      };
      monthly_income: {
        Row: { id: string; user_id: string; amount: number; source: string | null; month: string; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["monthly_income"]["Row"]> & { user_id: string; amount: number; month: string };
        Update: Partial<Database["public"]["Tables"]["monthly_income"]["Row"]>;
      };
      insights: {
        Row: { id: string; user_id: string; kind: string; payload: Json; window_start: string; window_end: string; generated_at: string };
        Insert: Partial<Database["public"]["Tables"]["insights"]["Row"]> & { user_id: string; kind: string; payload: Json; window_start: string; window_end: string };
        Update: Partial<Database["public"]["Tables"]["insights"]["Row"]>;
      };
      notifications: {
        Row: { id: string; user_id: string; kind: string; title: string; body: string | null; href: string | null; read_at: string | null; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["notifications"]["Row"]> & { user_id: string; kind: string; title: string };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Row"]>;
      };
      audit_logs: {
        Row: { id: string; user_id: string | null; actor_role: string | null; action: string; resource_type: string; resource_id: string | null; metadata: Json; ip: string | null; user_agent: string | null; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["audit_logs"]["Row"]> & { action: string; resource_type: string };
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Row"]>;
      };
      api_keys: {
        Row: { id: string; user_id: string; name: string; key_prefix: string; key_hash: string; scopes: string[]; last_used_at: string | null; revoked_at: string | null; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["api_keys"]["Row"]> & { user_id: string; name: string; key_prefix: string; key_hash: string; scopes: string[] };
        Update: Partial<Database["public"]["Tables"]["api_keys"]["Row"]>;
      };
      teams: {
        Row: { id: string; name: string; owner_id: string; plan: string; created_at: string };
        Insert: Partial<Database["public"]["Tables"]["teams"]["Row"]> & { name: string; owner_id: string };
        Update: Partial<Database["public"]["Tables"]["teams"]["Row"]>;
      };
      team_members: {
        Row: { id: string; team_id: string; user_id: string; role: "owner" | "admin" | "member" | "viewer"; invited_at: string; joined_at: string | null };
        Insert: Partial<Database["public"]["Tables"]["team_members"]["Row"]> & { team_id: string; user_id: string; role: Database["public"]["Tables"]["team_members"]["Row"]["role"] };
        Update: Partial<Database["public"]["Tables"]["team_members"]["Row"]>;
      };
      subscriptions_billing: {
        Row: { id: string; user_id: string; razorpay_customer_id: string | null; razorpay_subscription_id: string | null; plan: "free" | "pro" | "team"; status: string; current_period_end: string | null; cancel_at_period_end: boolean; created_at: string; updated_at: string };
        Insert: Partial<Database["public"]["Tables"]["subscriptions_billing"]["Row"]> & { user_id: string };
        Update: Partial<Database["public"]["Tables"]["subscriptions_billing"]["Row"]>;
      };
      feature_flags: {
        Row: { id: string; key: string; description: string | null; enabled: boolean; rollout_pct: number; allowlist: string[]; created_at: string; updated_at: string };
        Insert: Partial<Database["public"]["Tables"]["feature_flags"]["Row"]> & { key: string };
        Update: Partial<Database["public"]["Tables"]["feature_flags"]["Row"]>;
      };
      support_tickets: {
        Row: { id: string; user_id: string | null; subject: string; body: string; status: "open" | "in_progress" | "resolved" | "closed"; priority: "low" | "normal" | "high" | "urgent"; created_at: string; updated_at: string };
        Insert: Partial<Database["public"]["Tables"]["support_tickets"]["Row"]> & { subject: string; body: string };
        Update: Partial<Database["public"]["Tables"]["support_tickets"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      financial_health_score: { Args: { p_user_id: string }; Returns: number };
    };
    Enums: Record<string, never>;
  };
};
