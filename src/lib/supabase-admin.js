import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes('your_') || supabaseServiceKey.includes('your_')) {
  console.error('❌ Supabase Admin credentials missing or placeholder in .env.local');
  // We throw a descriptive error to prevent the app from crashing with cryptic "invalid URL" messages
  throw new Error('Supabase Service Role Key is not configured in .env.local');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
