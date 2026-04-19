'use client';

import { useState, useEffect } from 'react';
import { ImageIcon, Plus, Loader2, X, Trash2, Upload, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_MAP = {
  bags: ["schoolbags", "college bags", "travel bags", "handbags"],
  footwear: ["formal", "casual", "sports", "sandals", "slippers"],
  accessories: ["watches", "belts", "shoe polish"]
};

const CustomSelect = ({ options, value, onChange, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-5 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-sm ${
          disabled ? 'bg-gray-50 opacity-20 cursor-not-allowed border-transparent' : 
          isOpen ? 'bg-white border-accent-gold shadow-lg ring-4 ring-accent-gold/5 text-primary-navy' : 
          'bg-gray-50 border-transparent hover:bg-gray-100 text-primary-navy'
        }`}
      >
        <span className={!value ? 'text-gray-400' : ''}>{selectedLabel}</span>
        <Plus size={16} className={`transition-transform duration-300 text-accent-gold ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[100] top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(6,20,38,0.2)] border border-gray-100 p-2 overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  value === opt.value ? 'bg-accent-gold/10 text-accent-gold' : 'text-primary-navy/60 hover:bg-gray-50 hover:text-primary-navy'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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

  const [tagInput, setTagInput] = useState('');
  const [previews, setPreviews] = useState(
    initialData?.images || (initialData?.image_url ? [initialData.image_url] : [])
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const remainingSlots = 5 - formData.allAssets.length;
    const newFiles = files.slice(0, remainingSlots);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
    setFormData(prev => ({ 
      ...prev, 
      allAssets: [...prev.allAssets, ...newFiles] 
    }));
  };

  const removeImage = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ 
      ...prev, 
      allAssets: prev.allAssets.filter((_, i) => i !== index) 
    }));
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
  };

  const categoryOptions = [
    { value: 'bags', label: 'Bags' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const getTypeOptions = () => {
    const cat = formData.category?.toLowerCase() || '';
    const types = CATEGORY_MAP[cat] || [];
    return types.map(t => ({ value: t, label: t }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/80 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="bg-white w-full max-w-4xl rounded-[40px] shadow-3xl overflow-hidden my-auto"
      >
        <div className="px-10 py-8 bg-primary-navy border-b border-white/5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-serif italic text-white leading-tight">
              {initialData ? 'Modify' : 'Curate'} <span className="text-accent-gold not-italic font-black uppercase text-xl ml-2">Legacy Asset</span>
            </h2>
            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mt-1">Advanced Attribute Curation</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="col-span-3 lg:col-span-2">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Item Designation</label>
              <input 
                type="text" required value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent-gold outline-none font-bold text-primary-navy transition-all"
                placeholder="Entry name..."
              />
            </div>

            <div className="col-span-3 lg:col-span-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Item Code</label>
              <input 
                type="text" value={formData.item_code}
                onChange={(e) => setFormData({...formData, item_code: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent-gold outline-none font-bold text-primary-navy transition-all"
                placeholder="AFB-XXX"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Valuation ($)</label>
              <input 
                type="number" step="0.01" required value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent-gold outline-none font-bold text-primary-navy transition-all"
                placeholder="0.00"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Dimensions</label>
              <input 
                type="text" value={formData.val}
                onChange={(e) => setFormData({...formData, val: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent-gold outline-none font-bold text-primary-navy transition-all"
                placeholder="e.g. 42x30x15 cm"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Material</label>
              <input 
                type="text" value={formData.material}
                onChange={(e) => setFormData({...formData, material: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent-gold outline-none font-bold text-primary-navy transition-all"
                placeholder="e.g. Premium Leather"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Collection</label>
              <CustomSelect 
                options={categoryOptions}
                value={formData.category}
                placeholder="Select Collection"
                onChange={(val) => setFormData({...formData, category: val, type: ''})}
              />
            </div>

            <div className="col-span-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Type</label>
              <CustomSelect 
                options={getTypeOptions()}
                value={formData.type}
                placeholder={formData.category ? "Select Type" : "Pick Collection First"}
                disabled={!formData.category}
                onChange={(val) => setFormData({...formData, type: val})}
              />
            </div>

            <div className="col-span-1">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Tags</label>
              <div className="relative">
                <input 
                  type="text" value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent-gold outline-none font-bold text-primary-navy transition-all pr-12"
                  placeholder="New..."
                />
                <button 
                  onClick={addTag}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-gold hover:scale-110 transition-transform"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="col-span-3 flex flex-wrap gap-2 py-2">
              <AnimatePresence>
                {formData.tags.map((tag) => (
                  <motion.span 
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-gold/5 border border-accent-gold/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-accent-gold"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-primary-navy transition-colors">
                      <X size={12} strokeWidth={3} />
                    </button>
                  </motion.span>
                ))}
                {formData.tags.length === 0 && (
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">No exhibition tags assigned</span>
                )}
              </AnimatePresence>
            </div>

            <div className="col-span-3">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">Heritage Narrative</label>
              <textarea 
                rows="4" value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-accent-gold outline-none font-medium text-gray-600 resize-none transition-all placeholder:text-gray-300"
                placeholder="Compose the story..."
              ></textarea>
            </div>

            <div className="col-span-3 border-t border-gray-100 pt-8 mt-4">
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Visual Evidence (Max 5)</label>
              <div className="grid grid-cols-5 gap-4 mb-8">
                <AnimatePresence>
                  {previews.map((src, idx) => (
                    <motion.div 
                      key={src} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-gray-50"
                    >
                      <img src={src} className="w-full h-full object-cover" alt="Preview" />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {previews.length < 5 && (
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 hover:border-accent-gold/40 hover:bg-accent-gold/5 transition-all flex flex-col items-center justify-center cursor-pointer group">
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                    <Upload className="text-gray-300 group-hover:text-accent-gold" size={24} />
                  </label>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full bg-primary-navy text-white py-6 rounded-2xl font-black mt-12 flex items-center justify-center gap-4 disabled:opacity-50 hover:shadow-2xl hover:-translate-y-1 transition-all tracking-[0.4em] text-[10px] uppercase border border-white/5 active:scale-95 shadow-black/20"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={18} /> Processing Archives...</>
            ) : (
              initialData ? 'Update Legacy Asset' : 'Finalize Advanced Curation'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
