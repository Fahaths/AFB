'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Common/Navbar';
import Link from 'next/link';
import {
  ChevronRight,
  Search,
  Loader2,
  ShoppingBag,
  Footprints,
  Sparkles,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CollectionPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const categories = [
    { id: 'all', label: 'All', icon: <LayoutGrid size={16} /> },
    { id: 'bags', label: 'Bags', icon: <ShoppingBag size={16} /> },
    { id: 'footwear', label: 'Footwear', icon: <Footprints size={16} /> },
    { id: 'accessories', label: 'Accessories', icon: <Sparkles size={16} /> }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category?.toLowerCase() === activeCategory);

  if (!mounted) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-accent-gold" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F6F4] font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[40px] overflow-hidden mb-20 group"
        >
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover brightness-110"
            alt="Promotion"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent flex flex-col justify-center px-12 md:px-24">
            <h2 className="text-4xl md:text-6xl font-black text-primary-navy font-serif leading-[1.1] mb-8 tracking-tighter max-w-md">
              Your bag, your style <br />
              <span className="text-primary-navy font-serif italic font-normal">WhatsApp us now</span>
            </h2>
            <Link
              href="https://wa.me/91XXXXXXXXXX"
              className="bg-primary-navy text-white px-10 py-4 rounded-[40px] font-black uppercase tracking-widest text-xs w-fit hover:bg-accent-gold transition-all duration-500 shadow-xl shadow-navy-200"
            >
              Visit Shop
            </Link>
          </div>
        </motion.div>

        {/* Category Filters with Icons */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${activeCategory === cat.id
                  ? 'bg-primary-navy border-primary-navy text-white shadow-xl shadow-navy-100'
                  : 'bg-white border-transparent text-gray-400 hover:border-gray-200 hover:text-primary-navy'
                }`}
            >
              <span className={activeCategory === cat.id ? 'text-accent-gold' : 'text-gray-300'}>
                {cat.icon}
              </span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-accent-gold" size={40} />
            <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[10px]">Assembling Vault...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="block group h-full">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col bg-white rounded-[32px] p-6 hover:shadow-2xl hover:shadow-navy-100/10 transition-all duration-500 h-full border border-gray-100/50"
                  >
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#B4B4B4] mb-6">
                      {product.category || 'Luxury'}
                    </span>

                    <div className="aspect-[4/5] bg-[#F7F7F7] rounded-[24px] overflow-hidden mb-8">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 flex flex-col pt-2">
                      <h3 className="text-xl font-bold text-primary-navy font-serif leading-tight group-hover:text-accent-gold transition-colors mb-4 line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 items-center gap-2 flex">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                            International Reserve
                          </span>
                          <span className="text-2xl font-black text-primary-navy tracking-tighter">${product.price}</span>
                        </div>

                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary-navy hover:bg-accent-gold hover:text-white transition-all transform group-hover:rotate-12">
                          <ChevronRight size={20} strokeWidth={3} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-gray-100 rounded-[40px]">
            <Search className="mx-auto text-gray-200 mb-6" size={48} />
            <h2 className="text-2xl font-serif text-gray-400 italic">No items found in this section.</h2>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-8 text-accent-gold font-black uppercase tracking-widest text-[10px] underline"
            >
              View Full Collection
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
