const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://xfkkexagftuvkqargvxz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2tleGFnZnR1dmtxYXJndnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzExMDcsImV4cCI6MjA5MjEwNzEwN30.GPoQI7HkSL7-l6sVojSVtVabOdlnAn_6YxPat-OKvAk"
);

async function testUpdate() {
  const { data, error } = await supabase.from('reviews').update({ is_visible: true }).eq('id', 'some-id');
  console.log("Update error:", error);
}

testUpdate();
