'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/Product/ProductCard';

import { Loader2, ArrowRight } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
  const [heroSlides, setHeroSlides] = useState([
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop"
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    async function fetchData() {
      // Fetch Products
      const { data: prodData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      if (prodData) setLatestProducts(prodData);

      // Fetch Site Settings for Hero
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'hero_slides')
        .single();

      if (settingsData?.value && Array.isArray(settingsData.value)) {
        const validSlides = settingsData.value.filter(s => s !== null);
        if (validSlides.length > 0) setHeroSlides(validSlides);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  // Auto-rotate hero slides every 5 seconds if multiple exist
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#F7F3EE] overflow-x-hidden">

      {/* Cinematic Balanced Hero Section */}
      <section className="relative min-h-[90vh] w-full flex flex-col lg:flex-row bg-[#071B34] pt-[130px] px-[8%] pb-20 overflow-hidden">
        {/* Deep Luxury Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#071B34] via-[#0B2A52] to-[#071B34]"></div>
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#C89B3C]/10 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/4 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 opacity-40"></div>
        </div>

        {/* Left Side: Refined Typography (45%) */}
        <div className="relative z-10 w-full lg:w-[45%] flex flex-col justify-start items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-[520px]"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-10 bg-[#C89B3C]"></span>
              <span className="text-[#C89B3C] font-black uppercase tracking-[0.5em] text-[10px]">Al Fahath Bags & Footwears Archive</span>
            </div>

            <h1 className="text-[clamp(42px,5.5vw,76px)] font-bold text-white font-serif leading-[0.95] mb-8 tracking-tighter">
              Legacy in <br />
              the <span className="italic font-normal text-[#C89B3C]">Details.</span>
            </h1>

            <p className="text-[#C8CDD4] text-[15px] mb-10 font-medium tracking-wide leading-[1.8] max-w-[380px]">
              Discover the cinematic precision of Al Fahath Bags & Footwears, where editorial aesthetics meet centuries of global craftsmanship.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link
                href="/collection"
                className="group inline-flex items-center gap-4 px-10 py-4 bg-[#C89B3C] text-[#071B34] font-black uppercase tracking-[0.3em] text-[10px] rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(200,155,60,0.3)]"
              >
                Explore Archive
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Cinematic Product Visual (55%) */}
        <div className="relative z-10 w-full lg:w-[55%] flex items-center justify-center mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-sm"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[#C89B3C]/10 rounded-full blur-[100px] scale-150"></div>

            {/* Main Floating Image with AnimatePresence for transitions */}
            <div className="relative z-10 p-12 aspect-square flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <motion.div
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [-1, 1, -1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    <img
                      src={heroSlides[currentSlide]}
                      className="w-full h-full object-contain rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/5"
                      alt="Luxury Masterpiece"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              {/* Depth Overlay */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-[#071B34]/30 to-transparent pointer-events-none"></div>
            </div>

            {/* Accent Elements for Balance */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-5 w-20 h-20 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl z-20 hidden md:flex"
            >
              <div className="text-center">
                <span className="text-[#C89B3C] font-serif text-2xl block mb-0.5">
                  0{currentSlide + 1}
                </span>
                <span className="text-white/40 text-[6px] font-black uppercase tracking-widest">Edition</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Editorial Collection Grid */}
      <section className="py-32 px-6 md:px-[7%] bg-[#F7F3EE]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-24 border-b border-[#071B34]/5 pb-10">
            <h2 className="text-5xl md:text-7xl font-bold text-[#071B34] font-serif leading-tight">
              Newly Arrived <span className="italic font-normal text-[#C89B3C]">Collection.</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#C89B3C]" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {latestProducts.map((product, idx) => (
                <div key={product.id} className={idx % 4 === 1 || idx % 4 === 3 ? 'lg:translate-y-12' : ''}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


    </div>
  );
}
