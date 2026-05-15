const { createClient } = require('@supabase/supabase-client');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSchema() {
  console.log('Checking reviews table schema...');
  const { data, error } = await supabase.from('reviews').select('*').limit(1);
  
  if (error) {
    console.error('Error fetching reviews:', error.message);
    return;
  }
  
  if (data && data.length > 0) {
    console.log('Current columns:', Object.keys(data[0]));
  } else {
    console.log('No data found in reviews table to infer schema.');
    // Try to insert a dummy row to see what happens
    const { error: insertError } = await supabase.from('reviews').insert([{ test: 'test' }]);
    console.log('Insert test error (to see column names):', insertError?.message);
  }
}

checkSchema();
