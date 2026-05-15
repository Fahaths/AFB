'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadProductImage } from '@/utils/storage';
import { Loader2, Save, Image as ImageIcon, Plus, Trash2, Layout, RefreshCcw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AssetManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assets, setAssets] = useState({
    hero_slides: [],
    banners: {
      bags: '',
      footwear: '',
      accessories: ''
    }
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('key', ['hero_slides', 'banners']);

      if (data) {
        const heroData = data.find(i => i.key === 'hero_slides')?.value || [];
        const bannerData = data.find(i => i.key === 'banners')?.value || {};
        setAssets({ hero_slides: heroData, banners: bannerData });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, type, key) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error(`${file.name} exceeds the 2MB luxury baseline.`);
      return;
    }

    const toastId = toast.loading('Synchronizing visual...');
    try {
      const publicUrl = await uploadProductImage(file);
      
      if (type === 'hero') {
        const newSlides = [...assets.hero_slides];
        newSlides[key] = publicUrl;
        setAssets({ ...assets, hero_slides: newSlides });
      } else {
        const newBanners = { ...assets.banners };
        newBanners[key] = publicUrl;
        setAssets({ ...assets, banners: newBanners });
      }
      toast.success('Visual Synchronized', { id: toastId });
    } catch (err) {
      toast.error('Upload failed: ' + err.message, { id: toastId });
    }
  };

  const removeHeroSlide = (index) => {
    const newSlides = [...assets.hero_slides];
    newSlides[index] = null;
    setAssets({ ...assets, hero_slides: newSlides });
  };

  const resetToDefaults = () => {
    if (!confirm('Revert visuals to brand baseline?')) return;
    setAssets({
      hero_slides: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1594101419759-4673f47f2873?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
      ],
      banners: {
        bags: 'https://images.unsplash.com/photo-1544816153-12ad5d714b21?q=80&w=2070&auto=format&fit=crop',
        footwear: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070&auto=format&fit=crop',
        accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop'
      }
    });
    toast.success('Baseline Restored');
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const updates = [
        { key: 'hero_slides', value: assets.hero_slides },
        { key: 'banners', value: assets.banners }
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'key' });
        if (error) throw error;
      }

      toast.success('Platform Synchronized');
    } catch (err) {
      toast.error('Failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <div className="w-full text-white min-h-screen">
      
      {/* Top Toolbar Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-10">
        <div className="space-y-10 w-full max-w-[640px]">
          {/* Label */}
          <div className="flex items-center gap-3">
             <span className="h-[2px] w-10 bg-[#C89B3C]"></span>
             <span className="text-[#C89B3C] text-[13px] font-black uppercase tracking-[6px]">Luxe Control Layer</span>
          </div>

        </div>

        {/* Top-Right Buttons */}
        <div className="flex items-center gap-5 mt-4 lg:mt-0">
          <button 
            onClick={resetToDefaults}
            className="h-[62px] px-[34px] rounded-[18px] font-black uppercase tracking-[0.2em] text-[10px] text-white/40 hover:text-white hover:bg-white/5 transition-all border border-white/10 flex items-center gap-4 group"
          >
            <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" /> Reset Baseline
          </button>
          <button 
            onClick={saveSettings}
            disabled={saving}
            className="h-[62px] px-[42px] bg-[#C89B3C] text-[#071B34] rounded-[18px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:shadow-[0_20px_40px_rgba(200,155,60,0.3)] hover:-translate-y-1 transition-all flex items-center gap-4 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
            Deploy Visuals
          </button>
        </div>
      </header>

      {/* Workspace Area */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[32px]">
        
        {/* Left: Hero Slide Management */}
        <div className="space-y-8">
           <div className="flex items-center gap-4 mb-4">
              <Layout size={20} className="text-[#C89B3C]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20">Main Exhibition Slides</span>
           </div>

           <div className="grid grid-cols-1 gap-8">
             {[0, 1, 2].map((idx) => (
               <motion.div 
                 key={idx} 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="relative aspect-video rounded-[30px] overflow-hidden bg-white/3 border border-white/5 group shadow-2xl"
               >
                 {assets.hero_slides[idx] ? (
                   <>
                     <img src={assets.hero_slides[idx]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                     <div className="absolute inset-0 bg-[#071B34]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex items-center justify-center gap-5">
                        <label className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#C89B3C] transition-all hover:scale-110 shadow-2xl">
                           <ImageIcon size={22} className="text-[#071B34]" />
                           <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'hero', idx)} />
                        </label>
                        <button onClick={() => removeHeroSlide(idx)} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-110 shadow-2xl">
                           <Trash2 size={22} />
                        </button>
                     </div>
                     <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Slide 0{idx + 1}</span>
                     </div>
                   </>
                 ) : (
                   <label className="flex flex-col items-center justify-center h-full gap-5 cursor-pointer hover:bg-white/5 transition-all">
                      <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-[#C89B3C]/50 transition-colors">
                        <Plus className="text-white/20 group-hover:text-[#C89B3C]" size={32} strokeWidth={1} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Assign Visual 0{idx + 1}</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'hero', idx)} />
                   </label>
                 )}
               </motion.div>
             ))}
           </div>
        </div>

        {/* Right: Collection Banners */}
        <div className="space-y-8">
           <div className="flex items-center gap-4 mb-4">
              <Layers size={20} className="text-[#C89B3C]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20">Collection Atmosphere</span>
           </div>

           <div className="space-y-8">
             {['bags', 'footwear', 'accessories'].map((cat, i) => (
               <motion.div 
                 key={cat}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="space-y-4"
               >
                 <label className="text-[10px] font-black uppercase tracking-[4px] text-white/40 ml-2">{cat} Collection</label>
                 <div className="relative h-44 rounded-[30px] overflow-hidden bg-white/3 border border-white/5 group shadow-xl">
                    {assets.banners[cat] ? (
                      <>
                        <img src={assets.banners[cat]} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-[#071B34]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex items-center justify-center gap-5">
                           <label className="px-10 py-4 bg-white rounded-2xl flex items-center justify-center cursor-pointer font-black text-[10px] uppercase tracking-[0.2em] text-[#071B34] hover:bg-[#C89B3C] transition-all hover:-translate-y-1 shadow-2xl">
                              Replace Visual
                              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner', cat)} />
                           </label>
                        </div>
                      </>
                    ) : (
                      <label className="flex items-center justify-center h-full gap-5 cursor-pointer hover:bg-white/5 transition-all">
                         <Plus className="text-white/20" size={28} />
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Upload Banner</span>
                         <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner', cat)} />
                      </label>
                    )}
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(200,155,60,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}
