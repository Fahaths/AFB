import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { name, price, description, category, image_url } = body;

  const { data, error } = await supabase
    .from('products')
    .update({ name, price, description, category, image_url })
    .eq('id', id)
    .select();

  console.log('PUT /api/products/[id] - Data:', data);
  if (error) console.error('PUT /api/products/[id] - Error:', error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  console.log('DELETE /api/products/[id] - Status: Success');
  if (error) console.error('DELETE /api/products/[id] - Error:', error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
