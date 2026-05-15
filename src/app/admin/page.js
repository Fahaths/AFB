'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  ShoppingBag, 
  Tags, 
  MessageSquare, 
  Info, 
  Phone, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  ChevronRight, 
  ChevronDown,
  Upload, 
  Loader2, 
  ExternalLink, 
  Layers,
  Save,
  CheckCircle2,
  X,
  Briefcase,
  Footprints,
  Watch
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import ProductForm from '@/components/Admin/ProductForm';
import AssetManager from '@/components/Admin/AssetManager';
import ReviewManager from '@/components/Admin/ReviewManager';

// --- Sub-Components ---

const SidebarItem = ({ id, icon, label, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
      activeTab === id 
        ? 'bg-[#C89B3C] text-[#071B34] shadow-[0_10px_25px_rgba(200,155,60,0.2)]' 
        : 'text-[#8B97A8] hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={`transition-transform duration-500 ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </span>
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
    {activeTab === id && (
      <motion.div layoutId="sidebar-active" className="ml-auto">
        <ChevronRight size={14} strokeWidth={3} />
      </motion.div>
    )}
  </button>
);

const CategoryDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[48px] w-[220px] min-w-[220px] max-w-[220px] bg-white/5 border border-white/10 rounded-[14px] px-6 flex items-center justify-between gap-4 backdrop-blur-xl transition-all hover:bg-white/10 group"
      >
        <span className="text-[11px] font-black uppercase tracking-[2px] text-white/80 truncate">{value}</span>
        <ChevronDown size={18} className={`text-[#C89B3C] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[100] top-full left-0 w-full bg-[#0B2545] border border-white/10 rounded-[18px] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl mt-2"
          >
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-bold tracking-wider transition-all mb-1 last:mb-0 flex items-center justify-between group ${
                    value === opt ? 'bg-[#C89B3C]/20 text-[#C89B3C]' : 'text-white/60 hover:bg-white/5 hover:text-white hover:translate-x-1'
                  }`}
                >
                  {opt}
                  {value === opt && <CheckCircle2 size={12} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Card = ({ children, title, subtitle, action }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#0B2545] border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden h-full"
  >
    <div className="flex justify-between items-start mb-8">
      <div>
        <h3 className="text-xl font-serif italic text-white mb-1">{title}</h3>
        <p className="text-[#8B97A8] text-[9px] font-black uppercase tracking-widest">{subtitle}</p>
      </div>
      {action}
    </div>
    {children}
  </motion.div>
);

const StatWidget = ({ label, value, icon, color }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-[#0B2545] border border-white/5 p-8 rounded-[32px] flex items-center gap-6 shadow-xl group cursor-default"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500`} style={{ backgroundColor: `${color}15`, color: color }}>
      {icon}
    </div>
    <div>
      <p className="text-[#8B97A8] text-[9px] font-black uppercase tracking-[0.3em] mb-1">{label}</p>
      <h4 className="text-3xl font-serif text-white">{value}</h4>
    </div>
  </motion.div>
);

const IconMap = {
  Briefcase: <Briefcase size={22} />,
  Footprints: <Footprints size={22} />,
  Watch: <Watch size={22} />,
  ShoppingBag: <ShoppingBag size={22} />,
  Tags: <Tags size={22} />,
  Layers: <Layers size={22} />
};

const CategoryStudio = ({ mainCategories, subCategories, products, onAddMain, onAddSub, onDelete, onSeed }) => {
  const [selectedMainId, setSelectedMainId] = useState(mainCategories[0]?.id);
  const [isAddingMain, setIsAddingMain] = useState(false);
  const [isAddingSub, setIsAddingSub] = useState(false);
  const [newName, setNewName] = useState('');

  const activeMain = mainCategories.find(c => c.id === selectedMainId) || mainCategories[0];
  const activeSubCategories = subCategories.filter(s => s.main_category_id === selectedMainId);

  const getProductCount = (catName) => products.filter(p => p.category?.toLowerCase() === catName?.toLowerCase()).length;

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full h-full min-h-[600px]">
      
      {/* 1. Main Categories Panel (30%) */}
      <div className="w-full lg:w-[30%] bg-white/[0.03] border border-white/5 rounded-[28px] p-8 space-y-8 h-fit">
        <div>
          <span className="text-[#C89B3C] text-[10px] font-black uppercase tracking-[5px] mb-2 block">Organization</span>
          <h3 className="text-2xl font-serif italic text-white">Main Collections</h3>
        </div>
        <div className="space-y-4">
          {mainCategories.length === 0 && !isAddingMain && (
            <div className="py-12 px-6 border border-dashed border-white/5 rounded-3xl text-center space-y-6">
              <p className="text-white/20 font-serif italic text-lg leading-relaxed">Your collection hierarchy is currently blank.</p>
              <button 
                onClick={onSeed}
                className="px-8 py-3 bg-[#C89B3C]/10 border border-[#C89B3C]/30 text-[#C89B3C] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#C89B3C] hover:text-[#071B34] transition-all"
              >
                Bootstrap Default Legacy
              </button>
            </div>
          )}
          {mainCategories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedMainId(cat.id)}
              className={`w-full h-[72px] rounded-[18px] px-6 flex items-center justify-between border transition-all duration-300 cursor-pointer ${
                selectedMainId === cat.id 
                ? 'bg-[#C89B3C]/12 border-[#C89B3C]/22 text-white' 
                : 'bg-white/5 border-transparent text-white/40 hover:bg-[#C89B3C]/5 hover:border-[#C89B3C]/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`${selectedMainId === cat.id ? 'text-[#C89B3C]' : 'text-white/20'}`}>
                  {IconMap[cat.icon] || <ShoppingBag size={22} />}
                </div>
                <span className="text-lg font-bold tracking-wide">{cat.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {selectedMainId === cat.id && (
                  <button onClick={(e) => { e.stopPropagation(); onDelete('main_categories', cat.id); }} className="p-2 text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
                <ChevronRight size={16} className={selectedMainId === cat.id ? 'text-[#C89B3C]' : 'text-white/10'} />
              </div>
            </motion.div>
          ))}
        </div>

        {isAddingMain ? (
          <div className="space-y-3 p-4 bg-white/5 rounded-2xl border border-[#C89B3C]/20">
            <input 
              autoFocus
              className="w-full bg-[#071B34] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#C89B3C]/50"
              placeholder="Collection Name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') { onAddMain(newName); setNewName(''); setIsAddingMain(false); }}}
            />
            <div className="flex gap-2">
              <button onClick={() => { onAddMain(newName); setNewName(''); setIsAddingMain(false); }} className="flex-1 py-2 bg-[#C89B3C] text-[#071B34] rounded-lg font-bold text-[10px] uppercase">Establish</button>
              <button onClick={() => setIsAddingMain(false)} className="px-4 py-2 bg-white/5 text-white/40 rounded-lg text-[10px] uppercase">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setIsAddingMain(true)} className="w-full h-[58px] border border-dashed border-white/10 rounded-[18px] text-white/20 text-[10px] font-black uppercase tracking-widest hover:border-[#C89B3C]/30 hover:text-[#C89B3C] transition-all flex items-center justify-center gap-3">
            <Plus size={16} /> Add Collection
          </button>
        )}
      </div>

      {/* 2. Sub Categories Panel (40%) */}
      <div className="w-full lg:w-[40%] bg-white/[0.02] border border-white/5 rounded-[28px] p-8 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[#C89B3C] text-[10px] font-black uppercase tracking-[5px] mb-2 block">{activeMain?.name || 'Awaiting'} Hierarchy</span>
            <h3 className="text-2xl font-serif italic text-white">Sub Categories</h3>
          </div>
          <button 
            disabled={!selectedMainId}
            onClick={() => setIsAddingSub(true)}
            className="p-3 bg-[#C89B3C] text-[#071B34] rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#C89B3C]/10 disabled:opacity-30"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {isAddingSub && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-white/5 rounded-2xl border border-[#C89B3C]/20 space-y-3">
              <input 
                autoFocus
                className="w-full bg-[#071B34] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#C89B3C]/50"
                placeholder="Sub-type Name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={() => { onAddSub(selectedMainId, newName); setNewName(''); setIsAddingSub(false); }} className="flex-1 py-2 bg-[#C89B3C] text-[#071B34] rounded-lg font-bold text-[10px] uppercase">Define</button>
                <button onClick={() => setIsAddingSub(false)} className="px-4 py-2 bg-white/5 text-white/40 rounded-lg text-[10px] uppercase">Cancel</button>
              </div>
            </motion.div>
          )}

          {activeSubCategories.length > 0 ? (
            activeSubCategories.map((sub) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[64px] bg-[#102947] border border-white/5 rounded-[16px] px-6 flex items-center justify-between group hover:border-[#C89B3C]/20 transition-all"
              >
                <span className="text-[13px] font-bold text-white/80">{sub.name}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onDelete('sub_categories', sub.id)} className="p-2.5 bg-white/5 rounded-lg text-white/40 hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                </div>
              </motion.div>
            ))
          ) : !isAddingSub && (
            <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
              <p className="text-white/20 font-serif italic text-lg">No sub-categories defined</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Live Preview Panel (30%) */}
      <div className="w-full lg:w-[30%] bg-[#091F3B] border border-white/5 rounded-[28px] p-8 space-y-8 flex flex-col items-center text-center relative overflow-hidden h-fit">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#C89B3C]"></div>
        <div>
          <span className="text-[#C89B3C] text-[10px] font-black uppercase tracking-[5px] mb-2 block">Live Intelligence</span>
          <h3 className="text-2xl font-serif italic text-white">Preview</h3>
        </div>

        <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-[#C89B3C] shadow-2xl border border-white/10 mb-2">
          {IconMap[activeMain?.icon] || <ShoppingBag size={28} />}
        </div>

        <div>
          <h4 className="text-3xl font-serif text-white mb-2">{activeMain?.name || '---'}</h4>
          <p className="text-[#8B97A8] text-[10px] font-black uppercase tracking-[0.4em] mb-8">Frontend Identity</p>
        </div>

        <div className="w-full space-y-4">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-left">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Archive Density</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-serif text-[#C89B3C]">{getProductCount(activeMain?.name)}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Live Assets</span>
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-left">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Sub-Hierarchy</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-serif text-white">{activeSubCategories.length}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Defined Types</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// --- Main Page ---

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All Categories');
  
  // Data States
  const [products, setProducts] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [siteSettings, setSiteSettings] = useState({});
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);

  // Fetch all categories and types from DB instead of hardcoded
  const dynamicCategories = ['All Categories', ...mainCategories.map(c => c.name)];

  const categories = [
    "All Categories",
    "Bags",
    "Footwear",
    "Accessories",
    "School Bags",
    "Travel Bags",
    "Laptop Bags",
    "Wallets",
    "Belts",
    "Caps"
  ];

  useEffect(() => {
    setMounted(true);
    const session = localStorage.getItem('afb_admin_session');
    if (session) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const filteredProductsTable = products.filter(p => {
    if (filterCategory === 'All Categories') return true;
    return p.category?.toLowerCase() === filterCategory.toLowerCase() || 
           p.type?.toLowerCase() === filterCategory.toLowerCase();
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: prods } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      const { data: mainCats } = await supabase.from('main_categories').select('*').order('name');
      const { data: subCats } = await supabase.from('sub_categories').select('*').order('name');
      const { count: revCount } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
      const { data: slides } = await supabase.from('site_settings').select('*').eq('key', 'hero_slides').single();
      const { data: settings } = await supabase.from('site_settings').select('*');
      
      setProducts(prods || []);
      setMainCategories(mainCats || []);
      setSubCategories(subCats || []);
      setReviewCount(revCount || 0);
      setHeroSlides(slides?.value || []);
      
      const settingsMap = {};
      settings?.forEach(s => settingsMap[s.key] = s.value);
      setSiteSettings(settingsMap);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedCategories = async () => {
    const defaultStructure = [
      { name: 'Bags', icon: 'Briefcase', subs: ['School Bags', 'Travel Bags', 'Laptop Bags', 'Premium Collection'] },
      { name: 'Footwear', icon: 'Footprints', subs: ['Casual', 'Formal', 'Sneakers', 'Luxury'] },
      { name: 'Accessories', icon: 'Watch', subs: ['Wallets', 'Belts', 'Caps', 'Travel Accessories'] }
    ];

    try {
      toast.loading('Initializing Workspace...');
      for (const main of defaultStructure) {
        const slug = main.name.toLowerCase().replace(/\s+/g, '-');
        const { data: mc, error: me } = await supabase.from('main_categories').insert([{ name: main.name, slug, icon: main.icon }]).select().single();
        if (me) throw me;

        const subInserts = main.subs.map(s => ({ 
          main_category_id: mc.id, 
          name: s, 
          slug: s.toLowerCase().replace(/\s+/g, '-') 
        }));
        const { error: se } = await supabase.from('sub_categories').insert(subInserts);
        if (se) throw se;
      }
      toast.dismiss();
      toast.success('Workspace Synchronized');
      fetchData();
    } catch (err) {
      toast.dismiss();
      toast.error('Initialization Failed: ' + err.message);
    }
  };

  const handleAddMainCategory = async (name, icon = 'ShoppingBag') => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const { error } = await supabase.from('main_categories').insert([{ name, slug, icon }]);
    if (error) toast.error('Creation failed: ' + error.message);
    else {
      toast.success('Main Collection established');
      fetchData();
    }
  };

  const handleAddSubCategory = async (mainId, name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const { error } = await supabase.from('sub_categories').insert([{ main_category_id: mainId, name, slug }]);
    if (error) toast.error('Creation failed: ' + error.message);
    else {
      toast.success('Sub-type established');
      fetchData();
    }
  };

  const handleDeleteCategory = async (table, id) => {
    if (confirm('Eliminate this category layer? This may affect linked assets.')) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) toast.error('Elimination failed');
      else {
        toast.success('Layer eliminated');
        fetchData();
      }
    }
  };

  const handleProductDelete = async (id) => {
    if (confirm('Delete this asset from archive?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) toast.error('Elimination failed');
      else {
        toast.success('Asset eliminated');
        fetchData();
      }
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('afb_admin_session', 'active');
      toast.success('Access Granted');
    } else {
      toast.error('Invalid Credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('afb_admin_session');
    window.location.reload();
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071B34] p-8 relative overflow-hidden">
        <Toaster position="top-right" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C89B3C]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#C89B3C]/5 blur-[150px] rounded-full"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0B2545] p-12 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5 w-full max-w-md text-center relative z-10"
        >
          <div className="w-24 h-24 bg-[#C89B3C] rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-[0_20px_50px_rgba(200,155,60,0.3)] rotate-3">
            <span className="text-[#071B34] text-3xl font-black">AF</span>
          </div>
          <h1 className="text-4xl font-serif italic text-white mb-3">Admin Vault</h1>
          <p className="text-[#8B97A8] text-[10px] font-black uppercase tracking-[0.4em] mb-12">Creative Control Layer</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full bg-[#071B34] border border-white/10 rounded-2xl px-6 py-5 text-white text-center font-bold tracking-[0.5em] focus:ring-2 focus:ring-[#C89B3C] outline-none transition-all"
            />
            <button type="submit" className="w-full bg-[#C89B3C] text-[#071B34] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shadow-xl">
              Initialize Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071B34] flex text-white overflow-hidden font-sans">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#0B2545] border-r border-white/5 flex flex-col fixed h-full z-50">
        <div className="p-10 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#C89B3C] rounded-2xl flex items-center justify-center font-black text-[#071B34]">AF</div>
            <div className="flex flex-col">
              <span className="text-white text-[12px] font-black uppercase tracking-widest leading-none mb-1">Luxe Vault</span>
              <span className="text-[#C89B3C] text-[8px] font-bold uppercase tracking-[0.3em] opacity-60">Control Panel</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <SidebarItem id="dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="hero" icon={<ImageIcon size={18} />} label="Hero Slides" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="products" icon={<ShoppingBag size={18} />} label="Products" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="categories" icon={<Tags size={18} />} label="Categories" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="reviews" icon={<MessageSquare size={18} />} label="Reviews" activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="pt-4 pb-2 px-6">
            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#8B97A8]/40">Editorial</span>
          </div>
          <SidebarItem id="about" icon={<Info size={18} />} label="About Story" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem id="contact" icon={<Phone size={18} />} label="Contact" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="p-8 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-[#8B97A8] hover:text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[280px] min-h-screen overflow-y-auto p-12">
        

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-[#C89B3C]"></span>
                  <span className="text-[#C89B3C] text-[10px] font-black uppercase tracking-[0.4em]">Analytics Overview</span>
                </div>
                <h2 className="text-5xl font-serif italic text-white">Dashboard</h2>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatWidget label="Total Assets" value={products.length} icon={<ShoppingBag size={24} />} color="#C89B3C" />
                <StatWidget label="Live Slides" value={heroSlides.length} icon={<ImageIcon size={24} />} color="#60A5FA" />
                <StatWidget 
                  label="Active Collections" 
                  value={[...new Set(products.map(p => p.category))].length} 
                  icon={<Layers size={24} />} 
                  color="#34D399" 
                />
                <StatWidget 
                  label="Customer Reviews" 
                  value={reviewCount} 
                  icon={<MessageSquare size={24} />} 
                  color="#F59E0B" 
                />
                <StatWidget 
                  label="Inventory Value" 
                  value={`₹ ${products.reduce((acc, p) => acc + Number(p.price || 0), 0).toLocaleString('en-IN')}`} 
                  icon={<Tags size={24} />} 
                  color="#A78BFA" 
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card title="Latest Curation" subtitle="Recent archive entries">
                    <div className="space-y-4">
                      {products.slice(0, 5).map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#C89B3C]/20 transition-all group">
                          <div className="flex items-center gap-5">
                            <img src={p.image_url} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                            <div>
                              <p className="font-bold text-sm text-white mb-1">{p.name}</p>
                              <p className="text-[10px] text-[#8B97A8] uppercase tracking-widest">{p.category}</p>
                            </div>
                          </div>
                          <button onClick={() => openEditModal(p)} className="p-3 bg-white/5 rounded-xl text-[#8B97A8] hover:text-[#C89B3C] transition-all">
                            <Edit3 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
                <div>
                  <Card title="Quick Actions" subtitle="Administrative shortcuts">
                    <div className="space-y-4">
                      <button onClick={openAddModal} className="w-full p-6 bg-[#C89B3C] text-[#071B34] rounded-2xl flex items-center justify-between group hover:scale-[1.02] transition-all">
                        <span className="font-black uppercase tracking-widest text-[10px]">Add Product</span>
                        <Plus size={20} />
                      </button>
                      <button onClick={() => setActiveTab('hero')} className="w-full p-6 bg-white/5 text-white rounded-2xl flex items-center justify-between group hover:bg-[#C89B3C]/10 transition-all">
                        <span className="font-black uppercase tracking-widest text-[10px]">Hero Slides</span>
                        <ImageIcon size={20} className="text-[#C89B3C]" />
                      </button>
                      <button onClick={() => setActiveTab('settings')} className="w-full p-6 bg-white/5 text-white rounded-2xl flex items-center justify-between group hover:bg-[#C89B3C]/10 transition-all">
                        <span className="font-black uppercase tracking-widest text-[10px]">Site Settings</span>
                        <Settings size={20} className="text-[#C89B3C]" />
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'hero' && (
            <motion.div key="hero" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
               <AssetManager />
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div key="products" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-[#C89B3C]"></span>
                  <span className="text-[#C89B3C] text-[10px] font-black uppercase tracking-[0.4em]">Inventory Management</span>
                </div>
                <h2 className="text-5xl font-serif italic text-white">Products</h2>
              </header>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0B2545] p-6 rounded-[32px] border border-white/5">
                 <div className="flex items-center gap-6">
                    <button onClick={openAddModal} className="px-10 py-4 bg-[#C89B3C] text-[#071B34] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-105 transition-all">
                       Curate New Asset
                    </button>
                    <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-[3px] text-white/30">Filter:</span>
                      <CategoryDropdown 
                        value={filterCategory} 
                        onChange={setFilterCategory} 
                        options={dynamicCategories} 
                      />
                    </div>
                 </div>
              </div>

              <div className="bg-[#0B2545] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left table-fixed">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/5">
                      <th className="w-[40%] p-8 text-[9px] font-black uppercase tracking-[0.4em] text-[#8B97A8]">Asset</th>
                      <th className="w-[25%] p-8 text-[9px] font-black uppercase tracking-[0.4em] text-[#8B97A8]">Category</th>
                      <th className="w-[20%] p-8 text-[9px] font-black uppercase tracking-[0.4em] text-[#8B97A8]">Valuation</th>
                      <th className="w-[15%] p-8 text-right text-[9px] font-black uppercase tracking-[0.4em] text-[#8B97A8]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 transition-opacity duration-300">
                    {filteredProductsTable.length > 0 ? (
                      filteredProductsTable.map((p) => (
                        <tr key={p.id} className="hover:bg-white/[0.03] transition-colors h-[88px]">
                          <td className="p-8">
                            <div className="flex items-center gap-5">
                              <img src={p.image_url} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                              <p className="font-bold text-white text-base truncate">{p.name}</p>
                            </div>
                          </td>
                          <td className="p-8">
                             <div className="flex flex-col">
                                <span className="text-[11px] font-black uppercase tracking-widest text-[#C89B3C] mb-1">{p.category}</span>
                                <span className="text-[9px] font-medium text-white/40 uppercase tracking-widest">{p.type}</span>
                             </div>
                          </td>
                          <td className="p-8 text-white font-black text-base">₹ {Number(p.price).toLocaleString('en-IN')}</td>
                          <td className="p-8 text-right">
                             <div className="flex items-center justify-end gap-3">
                                <button onClick={() => openEditModal(p)} className="p-3 bg-white/5 rounded-xl text-[#8B97A8] hover:text-[#C89B3C] transition-all"><Edit3 size={16} /></button>
                                <button onClick={() => handleProductDelete(p.id)} className="p-3 bg-white/5 rounded-xl text-[#8B97A8] hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                             </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-20 text-center">
                          <p className="text-white/30 font-serif italic text-xl">No products found in this category</p>
                          <button 
                            onClick={() => setFilterCategory('All Categories')}
                            className="mt-4 text-[#C89B3C] text-[10px] font-black uppercase tracking-widest hover:underline"
                          >
                            Show All Inventory
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'categories' && (
            <motion.div key="categories" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 bg-[#C89B3C]"></span>
                  <span className="text-[#C89B3C] text-[10px] font-black uppercase tracking-[0.4em]">Structure Control</span>
                </div>
                <h2 className="text-5xl font-serif italic text-white">Category <span className="not-italic font-black text-3xl ml-2 uppercase text-[#C89B3C]">Studio</span></h2>
              </header>
              <CategoryStudio 
                mainCategories={mainCategories}
                subCategories={subCategories}
                products={products}
                onAddMain={handleAddMainCategory}
                onAddSub={handleAddSubCategory}
                onDelete={handleDeleteCategory}
                onSeed={handleSeedCategories}
              />
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <ReviewManager />
            </motion.div>
          )}

          {activeTab === 'settings' && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card title="Global Identity" subtitle="Primary brand settings">
                  <p className="text-white/40 italic">Global settings synchronization is active.</p>
                </Card>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Product Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsModalOpen(false)} 
                className="absolute inset-0 bg-[#071B34]/80 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 30 }} 
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="relative bg-[rgba(7,27,52,0.92)] w-[min(1280px,92vw)] md:h-auto max-h-[88vh] h-full rounded-none md:rounded-[32px] border-none md:border md:border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] p-6 md:p-12 backdrop-blur-[24px] overflow-y-auto overflow-x-hidden custom-scrollbar"
              >
                <ProductForm 
                  initialData={editingProduct} 
                  isSubmitting={isSubmitting}
                  onClose={() => { setIsModalOpen(false); fetchData(); }} 
                  onSubmit={async (data) => {
                    setIsSubmitting(true);
                    try {
                      // 1. Handle Image Uploads
                      const uploadedImages = [];
                      for (const asset of data.allAssets) {
                        if (typeof asset === 'string') {
                          uploadedImages.push(asset);
                        } else {
                          const fileName = `${Date.now()}-${asset.name}`;
                          const { data: uploadData, error: uploadError } = await supabase.storage
                            .from('afb-inventory')
                            .upload(fileName, asset);
                          
                          if (uploadError) throw uploadError;
                          
                          const { data: { publicUrl } } = supabase.storage
                            .from('afb-inventory')
                            .getPublicUrl(fileName);
                          
                          uploadedImages.push(publicUrl);
                        }
                      }

                      const productData = {
                        name: data.name,
                        price: parseFloat(data.price),
                        description: data.description,
                        category: data.category,
                        type: data.type,
                        val: data.val,
                        material: data.material,
                        item_code: data.item_code,
                        tags: data.tags,
                        images: uploadedImages,
                        image_url: uploadedImages[0] || ''
                      };

                      if (editingProduct) {
                        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
                        if (error) throw error;
                        toast.success('Archive Updated Successfully');
                      } else {
                        const { error } = await supabase.from('products').insert([productData]);
                        if (error) throw error;
                        toast.success('Asset Curated Successfully');
                      }
                      
                      setIsModalOpen(false);
                      fetchData();
                    } catch (error) {
                      console.error(error);
                      toast.error('Curation Failed: ' + error.message);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(200,155,60,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}
