const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://xfkkexagftuvkqargvxz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2tleGFnZnR1dmtxYXJndnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzExMDcsImV4cCI6MjA5MjEwNzEwN30.GPoQI7HkSL7-l6sVojSVtVabOdlnAn_6YxPat-OKvAk"
);

const dummyProducts = [
  {
    name: "Midnight Noir Handbag",
    price: 1850,
    description: "Crafted from fine Italian Saffiano leather, this geometric silhouette defines modern elegance.",
    category: "bags",
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop"
  },
  {
    name: "Emerald Velvet Slippers",
    price: 650,
    description: "Rich emerald silk velvet with hand-embroidered gold bullion crest. The pinnacle of lounge luxury.",
    category: "footwear",
    image_url: "https://images.unsplash.com/photo-1619441207908-42622abd2c1d?q=80&w=2071&auto=format&fit=crop"
  },
  {
    name: "Gold-Trimmed Chronograph",
    price: 12400,
    description: "Multi-functional complications with an 18k rose gold case and crocodile skin strap.",
    category: "accessories",
    image_url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop"
  },
  {
    name: "Crimson Silk Handbag",
    price: 2100,
    description: "Deep crimson silk exterior with signature gold latch and detachable chain strap.",
    category: "bags",
    image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?q=80&w=2070&auto=format&fit=crop"
  },
  {
      name: "Tuscan Leather Travel Bag",
      price: 3200,
      description: "Ample space for weekend getaways, featuring reinforced handles and a vintage finish.",
      category: "bags",
      image_url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop"
  },
  {
      name: "Sapphire Dial Automatic",
      price: 8900,
      description: "A deep sapphire face set against a brushed steel links. Precision meets prestige.",
      category: "accessories",
      image_url: "https://images.unsplash.com/photo-1508685096489-775b1dc7506c?q=80&w=1974&auto=format&fit=crop"
  }
];

async function seed() {
  console.log("Starting Minimal Schema Seeding...");
  try {
    const { data, error } = await supabase.from('products').insert(dummyProducts).select();
    if (error) {
      console.error("Seeding failed:", error);
    } else {
      console.log("Successfully seeded 6 treasures into the vault.");
      console.log(data);
    }
  } catch (e) {
    console.error("Unexpected error:", e);
  }
}

seed();
