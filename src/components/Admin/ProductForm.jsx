'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Loader2, 
  X, 
  Trash2, 
  Upload, 
  Tag, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { supabase } from '@/lib/supabase';

const CustomInput = ({ label, icon, ...props }) => (
  <div className="space-y-3">
    <label className="block text-[12px] font-black uppercase tracking-[4px] text-white/55 ml-1">{label}</label>
    <div className="relative group">
      <input 
        {...props}
        className="w-full h-[64px] bg-white/5 border border-white/10 rounded-[20px] px-[22px] text-[17px] text-white outline-none focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 transition-all duration-300 placeholder:text-white/20"
      />
      {icon && <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C89B3C] transition-colors">{icon}</div>}
    </div>
  </div>
);

const CustomSelect = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <div className="space-y-3">
      <label className="block text-[12px] font-black uppercase tracking-[4px] text-white/55 ml-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[64px] bg-white/5 border border-white/10 rounded-[20px] px-[22px] text-[17px] text-white/80 flex items-center justify-between group hover:border-white/20 transition-all"
        >
          <span className={!value ? 'text-white/20' : ''}>{selected ? selected.label : placeholder}</span>
          <ChevronDown size={20} className={`text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 5, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-[110] top-full left-0 w-full bg-[#0B2545] border border-white/10 rounded-[24px] p-3 shadow-2xl backdrop-blur-xl"
            >
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { onChange(opt.value); setIsOpen(false); }}
                    className={`w-full text-left px-5 py-4 rounded-xl text-[13px] font-bold tracking-wide transition-all mb-1 last:mb-0 ${
                      value === opt.value ? 'bg-[#C89B3C] text-[#071B34]' : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function ProductForm({ onSubmit, initialData, isSubmitting, onClose }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    type: initialData?.type || '',
    val: initialData?.val || '',
    material: initialData?.material || '',
    item_code: initialData?.item_code || '',
    tags: initialData?.tags || [],
    allAssets: initialData?.images || (initialData?.image_url ? [initialData.image_url] : [])
  });

  const [previews, setPreviews] = useState(
    initialData?.images || (initialData?.image_url ? [initialData.image_url] : [])
  );
  const [uploading, setUploading] = useState(false);
  const [dbCategories, setDbCategories] = useState([]);
  const [dbSubCategories, setDbSubCategories] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const { data: mc } = await supabase.from('main_categories').select('*');
      const { data: sc } = await supabase.from('sub_categories').select('*');
      setDbCategories(mc || []);
      setDbSubCategories(sc || []);
    };
    fetchCats();
  }, []);

  const validateImage = (file) => {
    return new Promise((resolve) => {
      // Rule: Under 50kb (for editorial high-performance)
      // Actually 50kb is very small for luxury photos. User asked for it though.
      if (file.size > 50 * 1024) {
        toast.error(`"${file.name}" exceeds 50KB limit. Optimization required.`);
        return resolve(false);
      }

      // Rule: WebP only
      if (!file.type.includes('webp')) {
        toast.error(`"${file.name}" is not WebP. High-performance format required.`);
        return resolve(false);
      }

      // Rule: 1:1 ratio check
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const ratio = img.width / img.height;
        if (ratio < 0.95 || ratio > 1.05) {
          toast.error(`"${file.name}" is not 1:1. Studio standards require square aspect.`);
          return resolve(false);
        }
        resolve(true);
      };
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const validFiles = [];
    for (const file of files) {
      const isValid = await validateImage(file);
      if (isValid) validFiles.push(file);
    }

    if (validFiles.length > 0) {
      const remainingSlots = 5 - formData.allAssets.length;
      const newFiles = validFiles.slice(0, remainingSlots);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setPreviews(prev => [...prev, ...newPreviews]);
      setFormData(prev => ({ 
        ...prev, 
        allAssets: [...prev.allAssets, ...newFiles] 
      }));
    }
    setUploading(false);
  };

  const removeImage = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ 
      ...prev, 
      allAssets: prev.allAssets.filter((_, i) => i !== index) 
    }));
  };

  const categoryOptions = dbCategories.map(c => ({ value: c.name, label: c.name, id: c.id }));

  const getTypeOptions = () => {
    const selectedMain = dbCategories.find(c => c.name === formData.category);
    if (!selectedMain) return [];
    
    return dbSubCategories
      .filter(s => s.main_category_id === selectedMain.id)
      .map(s => ({ value: s.name, label: s.name }));
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[42px] font-serif italic text-white leading-none mb-2">Curate <span className="not-italic text-[#C89B3C]">Legacy Asset</span></h2>
          <p className="text-[13px] font-black uppercase tracking-[4px] text-white/30">Advanced product curation studio</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
            <div className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse"></div>
            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Studio Active</span>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
        
        {/* Left Column: Details */}
        <div className="space-y-8 h-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <CustomInput 
                label="Item Designation" 
                placeholder="Enter elite product name..." 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <CustomInput 
              label="Valuation (₹)" 
              type="number" 
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
            
            <CustomInput 
              label="Item Code" 
              placeholder="AFB-LUXE-001"
              value={formData.item_code}
              onChange={(e) => setFormData({...formData, item_code: e.target.value})}
            />

            <CustomSelect 
              label="Collection"
              options={categoryOptions}
              value={formData.category}
              placeholder="Select Collection"
              onChange={(val) => setFormData({...formData, category: val, type: ''})}
            />

            <CustomSelect 
              label="Product Type"
              options={getTypeOptions()}
              value={formData.type}
              placeholder={formData.category ? "Select Type" : "Awaiting Collection"}
              onChange={(val) => setFormData({...formData, type: val})}
            />

            <CustomInput 
              label="Material" 
              placeholder="e.g. Italian Calfskin"
              value={formData.material}
              onChange={(e) => setFormData({...formData, material: e.target.value})}
            />

            <CustomInput 
              label="Dimensions" 
              placeholder="e.g. 40 x 30 x 15 cm"
              value={formData.val}
              onChange={(e) => setFormData({...formData, val: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[12px] font-black uppercase tracking-[4px] text-white/55 ml-1">Heritage Narrative</label>
            <textarea 
              rows="4" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Compose the story behind this masterpiece..."
              className="w-full bg-white/5 border border-white/10 rounded-[24px] p-6 text-[17px] text-white outline-none focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 transition-all duration-300 resize-y min-h-[160px] max-h-[220px] placeholder:text-white/20 custom-scrollbar"
            />
          </div>
        </div>

        {/* Right Column: Visuals & Status */}
        <div className="flex flex-col gap-8 h-fit">
          
          <div className="space-y-4">
            <label className="block text-[12px] font-black uppercase tracking-[4px] text-white/55 ml-1">Asset Imagery</label>
            <div 
              className={`relative h-[320px] max-h-[320px] bg-white/3 border-2 border-dashed border-[#C89B3C]/30 rounded-[32px] flex flex-col items-center justify-center p-8 transition-all hover:border-[#C89B3C]/60 group ${uploading ? 'opacity-50' : ''}`}
            >
              <input type="file" multiple accept="image/webp" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              {uploading ? (
                <Loader2 className="animate-spin text-[#C89B3C] mb-4" size={42} />
              ) : (
                <Upload className="text-[#C89B3C]/40 group-hover:text-[#C89B3C] transition-colors mb-4" size={42} />
              )}
              <p className="text-[13px] font-bold text-white/60 mb-1">Drag & drop WebP files</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C]/40">1:1 Ratio • Under 50KB</p>
            </div>

            {/* Preview Thumbnails */}
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {previews.map((src, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-[70px] h-[70px] rounded-2xl overflow-hidden border border-white/10 group"
                  >
                    <img src={src} className="w-full h-full object-cover" alt="" />
                    <button 
                      type="button" 
                      onClick={() => removeImage(idx)}
                      className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-[#091F3B] rounded-[32px] border border-white/5 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group h-fit">
            <div className="absolute top-4 left-4 flex items-center gap-2 opacity-40">
              <Eye size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">Live Preview</span>
            </div>
            
            {previews[0] ? (
              <div className="w-full aspect-square max-w-[160px] mb-6 rounded-2xl overflow-hidden shadow-2xl relative group-hover:scale-105 transition-transform duration-700">
                <img src={previews[0]} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            ) : (
              <div className="w-[160px] h-[160px] bg-white/5 rounded-[32px] border border-white/5 flex items-center justify-center mb-6">
                <ImageIcon className="text-white/10" size={48} />
              </div>
            )}
            
            <h4 className="text-xl font-serif italic mb-2">{formData.name || 'Untitled Asset'}</h4>
            <p className="text-[#C89B3C] font-black tracking-[0.2em] text-xs uppercase mb-6">{formData.category || 'Collection'}</p>
            
            <div className="flex gap-4 w-full">
               <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5">
                 <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Status</p>
                 <p className="text-[10px] font-bold text-emerald-400">Archivable</p>
               </div>
               <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5">
                 <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Valuation</p>
                 <p className="text-[10px] font-bold text-white">₹ {Number(formData.price || 0).toLocaleString('en-IN')}</p>
               </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || uploading}
            className="w-full h-[64px] bg-[#C89B3C] text-[#071B34] rounded-[20px] font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-white hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 shadow-xl shadow-[#C89B3C]/10 active:scale-95"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <CheckCircle2 size={18} />
                {initialData ? 'Update Legacy Archive' : 'Finalize Asset Curation'}
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C89B3C; border-radius: 10px; }
      `}</style>
    </div>
  );
}
