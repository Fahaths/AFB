'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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

import ProductCard from '@/components/Product/ProductCard';

export default function DynamicCollectionPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef(null);
  const slug = params.slug || [];
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest first');
  const [banners, setBanners] = useState({
    all: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80',
    bags: 'https://images.unsplash.com/photo-1544816153-12ad5d714b21?q=80&w=2070&auto=format&fit=crop',
    footwear: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070&auto=format&fit=crop',
    accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop'
  });

  // Unslugify helper
  const unslugify = (text) => text?.replace(/-/g, ' ');
  const slugify = (text) => text?.toLowerCase().replace(/\s+/g, '-');

  const activeCategory = unslugify(slug[0]) || 'all';
  const activeType = unslugify(slug[1]) || 'all';

  const categorySystem = {
    bags: ["schoolbags", "college bags", "travel bags", "handbags"],
    footwear: ["formal", "casual", "sports", "sandals", "slippers"],
    accessories: ["watches", "belts", "shoe polish"]
  };

  useEffect(() => {
    setMounted(true);
    async function fetchDesign() {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'banners')
        .single();
      
      if (data?.value) {
        setBanners(prev => ({ ...prev, ...data.value }));
      }
    }
    fetchDesign();

    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error) setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();

    // Auto-focus search if requested via URL
    if (searchParams.get('search') === 'focus') {
      setTimeout(() => {
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [searchParams]);

  const topCategories = [
    { id: 'all', label: 'All Items', icon: <LayoutGrid size={16} /> },
    { id: 'bags', label: 'Bags', icon: <ShoppingBag size={16} /> },
    { id: 'footwear', label: 'Footwear', icon: <Footprints size={16} /> },
    { id: 'accessories', label: 'Accessories', icon: <Sparkles size={16} /> }
  ];

  const filteredProducts = products.filter(p => {
    const categoryMatch = activeCategory === 'all' || p.category?.toLowerCase() === activeCategory;
    const typeMatch = activeType === 'all' || p.type?.toLowerCase() === activeType;
    const searchMatch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.type?.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Newest first') return new Date(b.created_at) - new Date(a.created_at);
    return 0;
  });

  const handleCategoryChange = (id) => {
    if (id === 'all') {
      router.push('/collection');
    } else {
      router.push(`/collection/${id}`);
    }
    setSearchQuery('');
  };

  const handleTypeChange = (type) => {
    if (type === 'all') {
      router.push(`/collection/${slugify(activeCategory)}`);
    } else {
      router.push(`/collection/${slugify(activeCategory)}/${slugify(type)}`);
    }
  };

  const typeIcons = {
    schoolbags: <ShoppingBag size={14} />,
    "college bags": <ShoppingBag size={14} />,
    "travel bags": <ShoppingBag size={14} />,
    handbags: <ShoppingBag size={14} />,
    formal: <ShoppingBag size={14} />,
    casual: <ShoppingBag size={14} />,
    sports: <Footprints size={14} />,
    sandals: <Footprints size={14} />,
    slippers: <Footprints size={14} />,
    watches: <Sparkles size={14} />,
    belts: <Sparkles size={14} />,
    "shoe polish": <Sparkles size={14} />
  };

  if (!mounted) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-accent-gold" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F6F4] font-sans">
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Promo Banner Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[40px] overflow-hidden mb-16 group"
         >
           <img
             src={banners[activeCategory] || banners.all}
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

        {/* Primary Category Filters - Custom Animated Design */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {topCategories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-8 py-4 overflow-hidden relative group cursor-pointer border-2 font-black uppercase tracking-[0.2em] text-[10px] rounded-full transition-all duration-500 ${
                activeCategory === cat.id 
                  ? 'bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-xl shadow-navy-100/20' 
                  : 'bg-white border-[#0B1F3A]/5 text-[#0B1F3A]'
              }`}
            >
              <span className={`absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-[#0B1F3A] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease ${activeCategory === cat.id ? 'h-64 -translate-y-32' : ''}`}></span>
              <span className={`relative flex items-center gap-3 transition duration-500 ease ${activeCategory === cat.id ? 'text-white' : 'group-hover:text-white'}`}>
                <span className={`transition-colors duration-500 ${activeCategory === cat.id ? 'text-[#C89B3C]' : 'text-[#0B1F3A]/30 group-hover:text-[#C89B3C]'}`}>
                  {cat.icon}
                </span>
                {cat.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Secondary Type Filters (Drill-down with Custom Design) */}
        <AnimatePresence mode="wait">
          {activeCategory !== 'all' && categorySystem[activeCategory] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              <button
                onClick={() => handleTypeChange('all')}
                className={`flex items-center gap-2 px-6 py-3 overflow-hidden relative group cursor-pointer border-2 font-black uppercase tracking-widest text-[9px] rounded-xl transition-all duration-500 ${
                  activeType === 'all' 
                    ? 'bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-lg shadow-navy-100/20' 
                    : 'bg-white border-[#0B1F3A]/5 text-[#0B1F3A]'
                }`}
              >
                <span className={`absolute w-48 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-12 bg-[#0B1F3A] top-1/2 group-hover:h-48 group-hover:-translate-y-24 ease ${activeType === 'all' ? 'h-48 -translate-y-24' : ''}`}></span>
                <span className={`relative flex items-center gap-2 transition duration-500 ease ${activeType === 'all' ? 'text-white' : 'group-hover:text-white'}`}>
                  <LayoutGrid size={14} />
                  All {activeCategory}
                </span>
              </button>

              {categorySystem[activeCategory].map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`flex items-center gap-2 px-6 py-3 overflow-hidden relative group cursor-pointer border-2 font-black uppercase tracking-widest text-[9px] rounded-xl transition-all duration-500 ${
                    activeType === type 
                      ? 'bg-[#C89B3C] border-[#C89B3C] text-white shadow-lg shadow-gold-100/20' 
                      : 'bg-white border-[#C89B3C]/10 text-[#C89B3C]'
                  }`}
                >
                  <span className={`absolute w-48 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-12 bg-[#C89B3C] top-1/2 group-hover:h-48 group-hover:-translate-y-24 ease ${activeType === type ? 'h-48 -translate-y-24' : ''}`}></span>
                  <span className={`relative flex items-center gap-2 transition duration-500 ease ${activeType === type ? 'text-white' : 'group-hover:text-white'}`}>
                    <span className="shrink-0">{typeIcons[type.toLowerCase()] || <Sparkles size={14} />}</span>
                    {type}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar Section */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0B1F3A]/30" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Searching for excellence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-[24px] py-5 px-14 text-sm font-medium text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/20 focus:border-[#C89B3C] transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0B1F3A]/40 hover:text-[#0B1F3A] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Title Section & Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0B1F3A] font-serif leading-tight">
            Every Luxury <span className="text-[#C89B3C]">For You!</span>
          </h1>

          <div className="relative group shrink-0">
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0B1F3A] hover:border-[#0B1F3A]/20 transition-all shadow-sm group-hover:border-accent-gold/40">
              Sort: {sortBy} <ChevronRight size={14} className="rotate-90 text-[#C89B3C]" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl shadow-navy-200/20 py-2 z-50 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
              {['Newest first', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                <button 
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-between group/item transition-colors ${
                    sortBy === option ? 'text-accent-gold bg-accent-gold/5' : 'text-[#0B1F3A]/60 hover:text-[#0B1F3A] hover:bg-gray-50'
                  }`}
                >
                  {option}
                  <div className={`w-1 h-1 rounded-full bg-[#C89B3C] transition-transform duration-300 ${sortBy === option ? 'scale-100' : 'scale-0 group-hover/item:scale-100'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid with Staggered Pop Animations */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-accent-gold" size={40} />
            <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[10px]">Assembling Vault...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { delay: idx * 0.1, type: "spring", stiffness: 200, damping: 20 }
                  }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-gray-100 rounded-[40px]">
            <Search className="mx-auto text-gray-200 mb-6" size={48} />
            <h2 className="text-2xl font-serif text-gray-400 italic">No {activeType !== 'all' ? activeType : activeCategory} items found.</h2>
            <button
              onClick={() => { router.push('/collection'); setSearchQuery(''); }}
              className="mt-8 text-accent-gold font-black uppercase tracking-widest text-[10px] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
