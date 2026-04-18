'use client';

import Navbar from '@/components/Common/Navbar';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-primary-navy overflow-hidden font-sans">
      <Navbar />
      
      {!mounted ? (
        <div className="min-h-screen flex items-center justify-center">
           <div className="w-10 h-10 border-4 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Cinematic Overlay */}
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/80 via-transparent to-primary-navy"></div>
            <img 
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop" 
              alt="Luxury Leather" 
              className="w-full h-full object-cover"
            />
          </div>

          <main className="relative z-10 pt-20 h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="text-accent-gold font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 block">
                Crafting Timeless Elegance
              </span>
              
              <h1 className="text-5xl md:text-8xl font-black text-white font-serif leading-[1.1] mb-8 tracking-tighter uppercase">
                Al Fahath <br />
                Bag's <span className="text-accent-gold italic lowercase">and</span> Footwear
              </h1>

              <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                Experience the pinnacle of luxury with our curated collection of premium leather bags and artisan footwear. Meticulously crafted for the discerning individual.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/collection" 
                  className="group bg-transparent border-2 border-accent-gold text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:bg-accent-gold hover:text-primary-navy"
                >
                  Explore Collection <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact" 
                  className="text-white/80 hover:text-white font-bold uppercase tracking-widest text-xs h-12 flex items-center px-6 transition-all"
                >
                  Virtual Concierge
                </Link>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-20"></div>
              <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">Refinement Below</span>
            </motion.div>
          </main>

          {/* Modern Background Blur Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/10 blur-[120px] rounded-full pointer-events-none"></div>
        </motion.div>
      )}
    </div>
  );
}
