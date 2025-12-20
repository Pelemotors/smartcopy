import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build-time errors when env vars are missing
let supabaseServerInstance: SupabaseClient | null = null;

function getSupabaseServer(): SupabaseClient {
  if (supabaseServerInstance) {
    return supabaseServerInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // During build time, env vars might not be available
  // Use placeholder values that will fail gracefully at runtime
  const url = supabaseUrl || 'https://placeholder.supabase.co';
  const key = supabaseServiceRoleKey || 'placeholder-key';

  // Server-side client with service role key (bypasses RLS)
  supabaseServerInstance = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseServerInstance;
}

// Proxy to lazy-load the client only when accessed
export const supabaseServer = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseServer();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

