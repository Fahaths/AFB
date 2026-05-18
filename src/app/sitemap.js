import { supabase } from '@/lib/supabase';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://afb-luxe.com';

  // Fetch all products
  const { data: products } = await supabase.from('products').select('slug, category, created_at');

  const productUrls = (products || []).map((product) => ({
    url: `${baseUrl}/collection/${(product.category || 'general').toLowerCase()}/${product.slug || product.id}`,
    lastModified: product.created_at || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...productUrls,
  ];
}
