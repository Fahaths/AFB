'use client';

import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hi! I'm interested in the ${product.name}. Could you share more details?`;
    const waUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[24px] p-2.5 flex flex-col gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="bg-[#f1f1f1] rounded-[20px] aspect-square relative overflow-hidden flex items-center justify-center">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex gap-1.5 items-center px-1">
        <div className="bg-[#f5f5f5] rounded-xl p-2 flex flex-col items-center justify-center min-w-[40px]">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Specs</span>
          <span className="text-[13px] font-bold text-gray-800 leading-none mt-1">
            {product.category === 'bags' ? 'L×W×H' : 'Style'}
          </span>
        </div>
        
        <div className="bg-[#f5f5f5] rounded-xl p-2 flex flex-col items-center justify-center min-w-[40px]">
          <Star size={12} fill="#FFB800" color="#FFB800" />
          <span className="text-[13px] font-bold text-gray-800 leading-none mt-1">4.8</span>
        </div>

        <button className="w-10 h-10 bg-[#f5f5f5] rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
          <Heart size={16} />
        </button>

        <button 
          onClick={handleWhatsApp}
          className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200 hover:scale-105 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>

      <div className="flex justify-between items-end px-1 pb-2 mt-auto">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{product.category}</span>
          <h3 className="text-[17px] font-bold text-gray-900 leading-tight font-serif">{product.name}</h3>
        </div>
        <div className="flex items-start text-gray-900 font-extrabold text-xl">
          <span className="text-xs mt-1 mr-0.5">$</span>{product.price}
        </div>
      </div>
    </motion.div>
  );
}
