const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://xfkkexagftuvkqargvxz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2tleGFnZnR1dmtxYXJndnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzExMDcsImV4cCI6MjA5MjEwNzEwN30.GPoQI7HkSL7-l6sVojSVtVabOdlnAn_6YxPat-OKvAk"
);

async function probe() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error("Probe failed:", error);
  } else if (data && data.length > 0) {
    console.log("Table columns list:", Object.keys(data[0]));
  } else {
    console.log("Table is empty, trying to get schema info...");
    const { data: schemaData, error: schemaError } = await supabase.rpc('get_table_info', { table_name: 'products' });
    if (schemaError) console.error("RPC Probe failed:", schemaError);
    else console.log(schemaData);
  }
}

probe();
