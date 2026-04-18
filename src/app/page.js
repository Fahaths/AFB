'use client';

import Navbar from '@/components/Common/Navbar';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/Product/ProductCard';
import { Loader2 } from 'lucide-react';

const IMAGES = [
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594101419759-4673f47f2873?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);

    async function fetchLatest() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (!error) setLatestProducts(data);
      setLoading(false);
    }
    fetchLatest();

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-primary-navy overflow-x-hidden font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/40 to-transparent z-10"></div>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              src={IMAGES[currentImage]}
              className="w-full h-full object-cover"
              alt="Hero Exhibition"
            />
          </AnimatePresence>
        </div>

        {/* Content */}
        <main className="relative z-20 h-full flex flex-col justify-center px-6 md:px-24 text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-6xl w-full"
          >
            <h1 className="text-3xl md:text-6xl font-black text-white font-serif leading-tight mb-8 tracking-tighter uppercase sm:whitespace-nowrap">
              Al Fahath Bag's <span className="text-accent-gold italic lowercase">and</span> Footwear
            </h1>

            <p className="text-white/60 text-lg md:text-xl max-w-xl mb-12 font-medium tracking-wide">
              Carry without limits.....
            </p>

            <div className="flex items-center">
              <Link 
                href="/collection" 
                className="px-10 py-5 border-2 border-accent-gold rounded-xl text-white font-bold uppercase tracking-[0.3em] text-[13px] hover:bg-accent-gold transition-all duration-500 hover:shadow-2xl hover:shadow-accent-gold/20"
              >
                Explore Collection
              </Link>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Latest Collection Section */}
      <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-6xl md:text-8xl font-black text-primary-navy font-serif tracking-tighter leading-none mb-6">
              Latest <span className="text-accent-gold">Collection</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Discover premium bags crafted for style, durability, and everyday excellence.
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-accent-gold" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <Link 
              href="/collection" 
              className="text-primary-navy font-black uppercase tracking-[0.4em] text-xs flex items-center gap-4 group hover:text-accent-gold transition-all"
            >
              View All Items <div className="w-12 h-[1px] bg-primary-navy group-hover:bg-accent-gold group-hover:w-20 transition-all"></div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
