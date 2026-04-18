'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadProductImage, deleteProductImage } from '@/utils/storage';
import { Plus, Loader2, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import ProductTable from '@/components/Admin/ProductTable';
import ProductForm from '@/components/Admin/ProductForm';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    console.log('Admin: Fetch Products - Data:', data);
    if (error) {
      console.error('Admin: Fetch Products - Error:', error);
      toast.error(error.message);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('System Online');
    } else {
      toast.error('Authentication Failed');
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      let imageUrl = editingProduct?.image_url || '';

      if (formData.image) {
        if (editingProduct?.image_url) {
          await deleteProductImage(editingProduct.image_url);
        }
        imageUrl = await uploadProductImage(formData.image);
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image_url: imageUrl
      };

      if (editingProduct) {
        const { data, error } = await supabase.from('products').update(productData).eq('id', editingProduct.id).select();
        console.log('Admin: Update - Data:', data);
        if (error) throw error;
        toast.success('Item updated');
      } else {
        const { data, error } = await supabase.from('products').insert([productData]).select();
        console.log('Admin: Insert - Data:', data);
        if (error) throw error;
        toast.success('Inventory registered');
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to archive ${product.name}?`)) return;

    try {
      if (product.image_url) await deleteProductImage(product.image_url);
      const { data, error } = await supabase.from('products').delete().eq('id', product.id).select();
      console.log('Admin: Delete - Data:', data);
      if (error) throw error;
      toast.success('Inventory purged');
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F4]">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-primary-navy rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-navy-100">
            <span className="text-white text-2xl font-bold tracking-tighter">AF</span>
          </div>
          <h1 className="text-2xl font-black text-primary-navy mb-2">Vault Access</h1>
          <p className="text-gray-400 text-sm mb-8">Enter passphrase to manage inventory</p>
          <div className="space-y-4">
            <input 
              type="password" 
              autoFocus
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent-gold outline-none text-center font-bold tracking-[0.4em]"
              placeholder="••••••••"
            />
            <button type="submit" className="w-full bg-primary-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#061426] transition-all">
              Initialize Portal
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F4] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-navy hidden lg:flex flex-col p-8 fixed h-full inset-y-0 z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-accent-gold rounded-xl flex items-center justify-center font-black text-white">AF</div>
          <div className="flex flex-col">
            <span className="text-white text-xs font-black uppercase tracking-widest">Al Fahath</span>
            <span className="text-accent-gold text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Admin Vault</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-accent-gold text-white font-bold text-sm transition-all">
            <LayoutDashboard size={20} /> Inventory
          </button>
          <button className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-white/50 hover:text-white transition-all font-bold text-sm">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <button onClick={() => window.location.reload()} className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-primary-navy tracking-tighter">Current Inventory</h1>
            <p className="text-gray-400 font-medium mt-1">Efficiently manage your luxury collection and digital assets.</p>
          </div>
          <button 
            onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
            className="bg-primary-navy text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:shadow-2xl hover:bg-[#061426] transition-all uppercase tracking-widest text-xs"
          >
            <Plus size={20} /> Register Item
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border border-gray-100 shadow-sm">
            <Loader2 className="animate-spin text-accent-gold" size={48} />
            <p className="mt-4 text-gray-400 font-black uppercase tracking-widest text-[10px]">Synchronizing Vault...</p>
          </div>
        ) : (
          <ProductTable 
            products={products} 
            onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true); }} 
            onDelete={handleDelete}
            mounted={mounted}
          />
        )}
      </main>

      {/* Modal / Form */}
      {isModalOpen && (
        <ProductForm 
          initialData={editingProduct} 
          isSubmitting={isSubmitting}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
