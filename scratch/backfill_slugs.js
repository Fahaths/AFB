const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://xfkkexagftuvkqargvxz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2tleGFnZnR1dmtxYXJndnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzExMDcsImV4cCI6MjA5MjEwNzEwN30.GPoQI7HkSL7-l6sVojSVtVabOdlnAn_6YxPat-OKvAk"
);

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function backfill() {
  const { data: products } = await supabase.from('products').select('*');
  if (!products) {
    console.log("No products found");
    return;
  }
  
  for (const product of products) {
    if (!product.slug) {
      let slug = generateSlug(product.name);
      
      // Check if slug exists, append random if so
      const { data: existing } = await supabase.from('products').select('id').eq('slug', slug).neq('id', product.id);
      if (existing && existing.length > 0) {
        slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
      }
      
      const { error } = await supabase.from('products').update({ slug }).eq('id', product.id);
      if (error) {
         console.error(`Failed to update ${product.name}:`, error.message);
      } else {
         console.log(`Updated ${product.name} -> ${slug}`);
      }
    } else {
      console.log(`Skipped ${product.name}, already has slug: ${product.slug}`);
    }
  }
  console.log("Backfill complete");
}

backfill();
