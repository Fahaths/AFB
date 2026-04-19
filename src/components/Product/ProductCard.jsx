'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'm interested in the ${product.name} priced at $${product.price}.`;
    window.open(`https://wa.me/919840031124?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/product/${product.id}`} className="block w-full max-w-[280px] mx-auto group">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)" }}
        viewport={{ once: true }}
        className="bg-[#0B1F3A] rounded-[32px] p-4 flex flex-col gap-4 border border-white/5 shadow-2xl transition-all duration-500 h-[360px] text-white overflow-hidden relative"
      >
        {/* 1. Top Section: Product Image */}
        <div className="relative h-[150px] w-full shrink-0 rounded-[24px] overflow-hidden bg-white/5">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000"
          />
          <div className="absolute top-2.5 left-2.5">
            <span className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
              {product.type || 'Premium'}
            </span>
          </div>
        </div>

        {/* 2. Middle Section: Metadata Row (Material, Rating, Wishlist) */}
        <div className="flex items-center gap-2 px-1">
          {/* Material Box */}
          <div className="bg-white/10 rounded-xl py-1 px-3 flex flex-col justify-center border border-white/5 min-w-[65px]">
            <span className="text-[6px] font-bold text-white/40 uppercase tracking-widest leading-none mb-0.5">Material</span>
            <span className="text-[10px] font-black text-white truncate">{product.material || 'Premium'}</span>
          </div>

          {/* Rating Box */}
          <div className="bg-white/10 rounded-xl h-[36px] px-2.5 flex items-center gap-1.5 border border-white/5">
            <Star size={12} fill="#FFB800" color="#FFB800" />
            <span className="text-[10px] font-black text-white">{product.rating || '4.8'}</span>
          </div>

          {/* Wishlist Button - Handled with stopPropagation */}
          <button 
            onClick={handleWishlist}
            className={`w-[36px] h-[36px] rounded-xl flex items-center justify-center transition-all duration-300 ml-auto border relative z-10 ${
              isWishlisted 
                ? 'bg-red-500/20 border-red-500/20 text-red-500 shadow-inner' 
                : 'bg-white/10 border-white/5 text-white/40 hover:text-red-400 hover:bg-white/20'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2.5} />
          </button>
        </div>

        {/* 3. Below: Product Name */}
        <div className="flex flex-col gap-0.5 flex-1 px-1 overflow-hidden justify-center">
          <h3 className="text-base font-black text-white font-serif leading-tight line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[8px] text-[#C89B3C] font-bold uppercase tracking-widest italic">AFB Premium Collection</p>
        </div>

        {/* 4. Bottom Row: Price & WhatsApp */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3 mb-1 px-1 mt-auto">
          <div className="flex items-baseline gap-0.5">
            <span className="text-xs font-medium text-white/40">$</span>
            <span className="text-2xl font-black text-white tracking-tighter">{product.price}</span>
          </div>

          <button
            onClick={handleWhatsApp}
            className="bg-[#25D366] hover:bg-[#1ebe5d] text-white w-[38px] h-[38px] rounded-xl flex items-center justify-center shadow-lg shadow-green-900/40 transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 relative z-10"
            title="WhatsApp Us"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
