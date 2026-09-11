import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Client untuk fetch data publik/statis (bypass RLS)
export const createAdminClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};
