'use client';

import { useState, useEffect, useRef, use } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Search, ShoppingBag, Footprints, Watch, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/Product/ProductCard';

export default function CollectionCategoryPage({ params }) {
  const { category } = use(params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMain, setActiveMain] = useState(category ? category.toUpperCase() : 'BAGS');
  const [activeSub, setActiveSub] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [banners, setBanners] = useState({
    BAGS: 'https://images.unsplash.com/photo-1544816153-12ad5d714b21?q=80&w=2070&auto=format&fit=crop',
    FOOTWEAR: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070&auto=format&fit=crop',
    ACCESSORIES: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop'
  });
  
  const sortRef = useRef(null);

  const categorySystem = {
    BAGS: {
      icon: <ShoppingBag size={18} />,
      sub: ["School Bags", "Travel Bags", "Laptop Bags", "Premium Collection"]
    },
    FOOTWEAR: {
      icon: <Footprints size={18} />,
      sub: ["Casual", "Formal", "Sneakers", "Luxury"]
    },
    ACCESSORIES: {
      icon: <Watch size={18} />,
      sub: ["Wallets", "Belts", "Caps", "Travel Accessories"]
    }
  };

  const sortOptions = [
    "Latest",
    "Oldest",
    "Price: Low to High",
    "Price: High to Low",
    "A-Z",
    "Z-A"
  ];

  useEffect(() => {
    setMounted(true);
    async function fetchData() {
      // Fetch Products
      const { data: prodData } = await supabase.from('products').select('*');
      if (prodData) setProducts(prodData);

      // Fetch Banners
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'banners')
        .single();
      
      if (settingsData?.value) {
        const dbBanners = settingsData.value;
        setBanners(prev => ({
          BAGS: dbBanners.bags || prev.BAGS,
          FOOTWEAR: dbBanners.footwear || prev.FOOTWEAR,
          ACCESSORIES: dbBanners.accessories || prev.ACCESSORIES
        }));
      }
      
      setLoading(false);
    }
    fetchData();

    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSortedProducts = (items) => {
    let sorted = [...items];
    switch (sortBy) {
      case 'Latest':
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'Oldest':
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'Price: Low to High':
        return sorted.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'A-Z':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'Z-A':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  const filteredProducts = getSortedProducts(products.filter(p => {
    const mainMatch = p.category?.toUpperCase() === activeMain;
    const subMatch = activeSub === 'ALL' || p.type?.toLowerCase() === activeSub.toLowerCase();
    const searchMatch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.type?.toLowerCase().includes(searchQuery.toLowerCase());
    return mainMatch && subMatch && searchMatch;
  }));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F7F3EE] pb-32">
      
      {/* Cinematic Layered Hero Header */}
      <header className="relative w-full overflow-hidden flex items-center justify-center h-[300px] md:h-[360px] lg:h-[420px] xl:h-[460px] bg-[#071B34]">
        {/* Background Image Layer */}
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeMain}
            src={banners[activeMain]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-center z-[1]"
            alt=""
          />
        </AnimatePresence>

        {/* Sophisticated Overlay Layer */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[rgba(7,27,52,0.72)] to-[rgba(7,27,52,0.55)]"></div>
        
        {/* Editorial Content Layer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-[10] text-center px-6 pt-10 md:pt-14 flex flex-col items-center"
        >
          <span className="text-[#C89B3C] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block drop-shadow-sm">Archive 2026</span>
          <h1 className="text-[clamp(56px,8vw,140px)] font-bold text-white font-serif tracking-tight leading-[0.95] mb-8 capitalize max-w-[1200px]">
            The <span className="italic font-normal">Editorial</span> Collection
          </h1>
          <p className="text-white/40 text-[13px] font-black uppercase tracking-[0.5em] mt-2">Curated Heritage & Design</p>
        </motion.div>
      </header>

      {/* Category Navigation */}
      <div className="max-w-[1280px] mx-auto px-6 mt-16 mb-12 flex flex-col items-center">
        {/* Main Categories Row */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16 mb-8 border-b border-black/5 pb-8 w-full md:w-auto">
          {Object.entries(categorySystem).map(([key, data]) => (
            <button
              key={key}
              onClick={() => {
                setActiveMain(key);
                setActiveSub('ALL');
              }}
              className={`flex items-center gap-3 relative pb-2 transition-all duration-300 group ${
                activeMain === key ? 'text-[#C89B3C]' : 'text-[#7A7A7A] hover:text-[#071B34]'
              }`}
            >
              <span className={`transition-transform duration-500 ${activeMain === key ? 'scale-110' : 'group-hover:scale-110'}`}>
                {data.icon}
              </span>
              <span className="text-[11px] font-black uppercase tracking-[3px] font-sans">{key}</span>
              {activeMain === key && (
                <motion.div 
                  layoutId="col-main-underline" 
                  className="absolute bottom-[-1px] left-0 w-full h-[1.5px] bg-[#C89B3C]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMain}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-4"
          >
            <button
              onClick={() => setActiveSub('ALL')}
              className={`text-[10px] font-black uppercase tracking-[2px] transition-all ${
                activeSub === 'ALL' ? 'text-[#071B34]' : 'text-[#7A7A7A] hover:text-[#071B34]'
              }`}
            >
              All {activeMain.toLowerCase()}
            </button>
            {categorySystem[activeMain].sub.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className={`text-[10px] font-black uppercase tracking-[2px] transition-all flex items-center gap-2 group ${
                  activeSub === sub ? 'text-[#071B34]' : 'text-[#7A7A7A] hover:text-[#071B34]'
                }`}
              >
                <div className={`w-1 h-1 rounded-full bg-[#C89B3C] transition-transform duration-300 ${activeSub === sub ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></div>
                {sub}
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Controls: Search & Sort */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-[320px] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#071B34] z-10 pointer-events-none transition-colors group-focus-within:text-[#C89B3C]" size={18} strokeWidth={2.5} />
            <input 
              type="text"
              placeholder="Search collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[52px] bg-white/70 backdrop-blur-sm border border-[#0B1F3A]/8 rounded-[14px] px-14 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#C89B3C]/20 transition-all shadow-sm"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative w-full md:w-[220px]" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full h-[52px] bg-white border border-[#0B1F3A]/8 rounded-[14px] px-5 flex items-center justify-between text-sm font-medium text-[#071B34] hover:border-[#C89B3C]/30 transition-all shadow-sm group"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#7A7A7A] mb-1">Sort By</span>
                <span>{sortBy}</span>
              </div>
              <ChevronDown size={16} className={`text-[#7A7A7A] transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-[60px] left-0 w-full bg-white border border-black/5 rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden z-[50]"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-all ${
                        sortBy === option 
                          ? 'bg-[#F7F3EE] text-[#C89B3C]' 
                          : 'text-[#071B34] hover:bg-[#F7F3EE] hover:text-[#C89B3C]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Editorial Product Grid */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-10">
        {loading ? (
          <div className="flex justify-center py-40">
            <Loader2 className="animate-spin text-[#C89B3C]" size={40} />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-40 border-t border-black/5">
            <h2 className="text-2xl font-serif text-[#7A7A7A] italic">No items matching your selection.</h2>
            <button
              onClick={() => { setActiveMain('BAGS'); setActiveSub('ALL'); setSearchQuery(''); setSortBy('Latest'); }}
              className="mt-6 text-[#C89B3C] font-black uppercase tracking-widest text-[9px] underline block mx-auto"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
