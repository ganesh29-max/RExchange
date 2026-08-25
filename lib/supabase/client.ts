import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('http')
);

export function createClient() {
  if (!isSupabaseConfigured) {
    // Return dummy client if unconfigured to prevent build/render errors
    return createSupabaseClient<Database>(
      'https://dummy-placeholder.supabase.co',
      'dummy-anon-key'
    );
  }
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
}
