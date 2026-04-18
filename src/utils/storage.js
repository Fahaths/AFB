import { supabase } from '@/lib/supabase';

export async function uploadProductImage(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  console.log('Storage Upload - Data:', data);
  if (error) console.error('Storage Upload - Error:', error);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteProductImage(url) {
  if (!url) return;
  
  try {
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('products')
      .remove([filePath]);

    console.log('Storage Delete - Data:', data);
    if (error) console.error('Storage Delete - Error:', error);

    if (error) console.error('Error deleting image:', error);
  } catch (err) {
    console.error('Failed to parse image URL for deletion:', err);
  }
}
