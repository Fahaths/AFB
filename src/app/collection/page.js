'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Common/Navbar';
import Link from 'next/link';
import { ShoppingBag, ChevronRight, Filter, Search, Loader2 } from 'lucide-react';
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

  const categories = ['all', 'bags', 'footwear', 'accessories'];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory);

  if (!mounted) return (
    <div className="min-h-screen bg-white">
      <Navbar />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F6F4] font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block"
          >
            Curated Excellence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-primary-navy font-serif tracking-tighter uppercase"
          >
            Our Collection
          </motion.h1>
        </header>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                activeCategory === cat 
                  ? 'bg-primary-navy border-primary-navy text-white shadow-xl shadow-navy-100' 
                  : 'bg-white border-transparent text-gray-400 hover:border-gray-200 hover:text-primary-navy'
              }`}
            >
              {cat}
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
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative flex flex-col bg-white rounded-[32px] p-6 hover:shadow-2xl hover:shadow-navy-100/10 transition-all duration-500"
                >
                  {/* Category Badge */}
                  <span className="absolute top-8 left-8 z-10 text-[9px] font-black uppercase tracking-widest text-[#B4B4B4] bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100">
                    {product.category || 'Luxury'}
                  </span>

                  {/* Image Container */}
                  <Link href={`/product/${product.id}`} className="block aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-8">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-primary-navy font-serif leading-tight">
                        {product.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed">
                      {product.description || 'A masterpiece of contemporary design and timeless elegance.'}
                    </p>

                    <div className="flex items-center justify-between pt-4 mt-auto">
                      <span className="text-2xl font-black text-primary-navy tracking-tighter">
                        ${product.price}
                      </span>
                      <Link 
                        href={`/product/${product.id}`}
                        className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary-navy hover:bg-accent-gold hover:text-white transition-all transform group-hover:rotate-12"
                      >
                        <ChevronRight size={20} strokeWidth={3} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
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
