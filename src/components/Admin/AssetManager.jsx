'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadProductImage, deleteProductImage } from '@/utils/storage';
import { Loader2, Save, Image as ImageIcon, Plus, Trash2, Layout, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AssetManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assets, setAssets] = useState({
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
        const bannerData = data.find(i => i.key === 'banners')?.value || assets.banners;
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

  const removeBanner = (key) => {
    const newBanners = { ...assets.banners };
    newBanners[key] = null;
    setAssets({ ...assets, banners: newBanners });
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin text-accent-gold mb-6" size={48} strokeWidth={1} />
        <p className="text-primary-navy font-black uppercase tracking-[0.5em] text-[9px] opacity-40">Loading Assets...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[2px] w-8 bg-accent-gold/40"></span>
            <span className="text-accent-gold text-[9px] font-black uppercase tracking-[0.4em]">Visual Narrative</span>
          </div>
          <h1 className="text-4xl font-serif italic text-primary-navy tracking-tight">Design <span className="text-accent-gold not-italic font-black uppercase text-3xl ml-2">Editor</span></h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={resetToDefaults}
            className="px-6 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] text-gray-400 hover:text-primary-navy hover:bg-gray-100 transition-all border border-gray-100 flex items-center gap-3"
          >
            <RefreshCcw size={14} /> Reset
          </button>
          <button 
            onClick={saveSettings}
            disabled={saving}
            className="bg-accent-gold text-primary-navy px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] hover:shadow-[0_20px_40px_rgba(200,155,60,0.15)] hover:-translate-y-0.5 transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
            Deploy Changes
          </button>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Hero Management */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Layout size={18} className="text-accent-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-navy/40">Hero Exhibition</span>
          </div>
          <div className="space-y-4">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="relative group aspect-video rounded-[24px] overflow-hidden bg-gray-50 border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] transition-all hover:shadow-xl">
                {assets.hero_slides[idx] ? (
                  <>
                    <img src={assets.hero_slides[idx]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hero" />
                    <div className="absolute inset-0 bg-primary-navy/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                       <label className="p-4 bg-white rounded-2xl cursor-pointer hover:bg-accent-gold transition-all hover:-translate-y-1 shadow-2xl">
                          <ImageIcon size={18} className="text-primary-navy" />
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'hero', idx)} />
                       </label>
                       <button onClick={() => removeHeroSlide(idx)} className="p-4 bg-white rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all hover:-translate-y-1 shadow-2xl">
                          <Trash2 size={18} />
                       </button>
                    </div>
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center h-full gap-4 cursor-pointer hover:bg-gray-100/50 transition-colors">
                    <Plus className="text-gray-300" size={32} strokeWidth={1} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Add Slide {idx + 1}</span>
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'hero', idx)} />
                  </label>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Banner Management */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <ImageIcon size={18} className="text-accent-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-navy/40">Brand Banners</span>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {['bags', 'footwear', 'accessories'].map((cat) => (
              <div key={cat} className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[8px] font-black uppercase tracking-widest text-gray-400">{cat} Collection</label>
                </div>
                <div className="relative group h-32 rounded-[24px] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm transition-all hover:shadow-md">
                   {assets.banners[cat] ? (
                     <>
                        <img src={assets.banners[cat]} className="w-full h-full object-cover" alt="Banner" />
                        <div className="absolute inset-0 bg-primary-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                           <label className="px-6 py-3 bg-white rounded-xl cursor-pointer font-black text-[9px] uppercase tracking-[0.2em] text-primary-navy hover:bg-accent-gold transition-all shadow-xl">
                              Swap
                              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner', cat)} />
                           </label>
                           <button onClick={() => removeBanner(cat)} className="p-3 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl">
                              <Trash2 size={16} />
                           </button>
                        </div>
                     </>
                   ) : (
                     <label className="flex items-center justify-center h-full gap-3 cursor-pointer hover:bg-gray-100/50 transition-colors">
                        <Plus className="text-gray-300" size={24} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Upload Visual</span>
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'banner', cat)} />
                     </label>
                   )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
