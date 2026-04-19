'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadProductImage, deleteProductImage } from '@/utils/storage';
import { Plus, Loader2, LayoutDashboard, Settings, LogOut, Image as ImageIcon, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ProductTable from '@/components/Admin/ProductTable';
import ProductForm from '@/components/Admin/ProductForm';
import AssetManager from '@/components/Admin/AssetManager';
import ReviewManager from '@/components/Admin/ReviewManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('inventory');
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
      const finalImageUrls = [];

      // Process all selected assets
      for (const asset of formData.allAssets) {
        if (typeof asset === 'string') {
          // It's an existing URL, keep it
          finalImageUrls.push(asset);
        } else {
          // It's a new File, upload it
          const url = await uploadProductImage(asset);
          finalImageUrls.push(url);
        }
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        type: formData.type,
        val: formData.val,
        material: formData.material,
        item_code: formData.item_code,
        tags: formData.tags,
        image_url: finalImageUrls[0] || '', // Primary image
        images: finalImageUrls // Full gallery
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
      <div className="min-h-screen flex items-center justify-center bg-[#0A1628] p-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-gold/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-gold/5 blur-[120px] rounded-full"></div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin} 
          className="bg-[#0D1F35] p-12 rounded-[40px] shadow-2xl border border-white/5 w-full max-w-sm text-center relative z-10"
        >
          <div className="w-20 h-20 bg-accent-gold rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-accent-gold/20 rotate-3">
            <span className="text-primary-navy text-2xl font-black">AF</span>
          </div>
          <h1 className="text-3xl font-serif italic text-white mb-3">Vault Access</h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Administrative Control Layer</p>
          
          <div className="space-y-6">
            <div className="relative group">
              <input 
                type="password" 
                autoFocus
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl bg-[#152B46] border border-white/5 text-white focus:ring-2 focus:ring-accent-gold outline-none text-center font-bold tracking-[0.5em] placeholder:text-gray-700 transition-all"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-accent-gold text-primary-navy py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:scale-[1.02] transition-all shadow-xl shadow-accent-gold/10">
              Unlock Terminal
            </button>
          </div>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex">
      {/* Sidebar: Elite Minimal Navigation */}
      <aside className="w-64 bg-primary-navy flex flex-col fixed h-full inset-y-0 z-50 border-r border-[#0A1A2F] shadow-[10px_0_30px_rgba(0,0,0,0.02)]">
        <div className="p-8 pb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-gold rounded-xl flex items-center justify-center font-black text-primary-navy shadow-lg shadow-accent-gold/20">AF</div>
            <div className="flex flex-col">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1">Vault</span>
              <span className="text-accent-gold text-[8px] font-bold uppercase tracking-[0.3em] opacity-60">Admin Portal</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'inventory', icon: <LayoutDashboard size={18} />, label: 'Inventory' },
            { id: 'assets', icon: <ImageIcon size={18} />, label: 'Design' },
            { id: 'feedback', icon: <MessageSquare size={18} />, label: 'Feedback' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 w-full px-5 py-3.5 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-accent-gold/5 text-accent-gold border-r-4 border-accent-gold' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:translate-x-1'}`}>
                {item.id === 'inventory' ? <LayoutDashboard size={18} /> : 
                 item.id === 'assets' ? <ImageIcon size={18} /> : <MessageSquare size={18} />}
              </span>
              <span className="font-black uppercase tracking-[0.2em] text-[9px]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="p-5 bg-[#0A1A2F] rounded-2xl border border-white/5 mb-6">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-white/80 text-[8px] font-black uppercase tracking-widest">Operator Active</span>
             </div>
             <p className="text-white/30 text-[8px] leading-relaxed">Secure Node Alpha-7</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center gap-4 w-full px-5 py-3.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all group"
          >
            <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
            <span className="font-black uppercase tracking-[0.2em] text-[9px]">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content: High-Performance Workplace */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-12 lg:p-16">
          {activeTab === 'inventory' ? (
            <>
              <motion.header 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-[2px] w-8 bg-accent-gold/40"></span>
                    <span className="text-accent-gold text-[9px] font-black uppercase tracking-[0.4em]">Inventory Hub</span>
                  </div>
                  <h1 className="text-4xl font-serif italic text-primary-navy tracking-tight">Master <span className="text-accent-gold not-italic font-black uppercase text-3xl ml-2">Legacy</span></h1>
                </div>
                
                <button 
                  onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                  className="bg-primary-navy text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-[0_20px_40px_rgba(6,20,38,0.15)] hover:-translate-y-0.5 transition-all flex items-center gap-3 border border-white/5"
                >
                  <Plus size={16} strokeWidth={3} className="text-accent-gold" /> Curate Item
                </button>
              </motion.header>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-40">
                  <Loader2 className="animate-spin text-accent-gold mb-6" size={48} strokeWidth={1} />
                  <p className="text-primary-navy font-black uppercase tracking-[0.5em] text-[10px] opacity-40">Accessing Vault...</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-[32px] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.02)] overflow-hidden"
                >
                  <ProductTable 
                    products={products} 
                    onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true); }} 
                    onDelete={handleDelete}
                    mounted={mounted}
                  />
                </motion.div>
              )}
            </>
          ) : activeTab === 'assets' ? (
            <AssetManager />
          ) : (
            <ReviewManager />
          )}
        </div>
      </main>

      {/* Modal / Form */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductForm 
            initialData={editingProduct} 
            isSubmitting={isSubmitting}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
