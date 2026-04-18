'use client';

import { useState, useEffect } from 'react';
import { ImageIcon, Plus, Loader2, X } from 'lucide-react';

export default function ProductForm({ onSubmit, initialData, isSubmitting, onClose }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    image: null
  });
  const [preview, setPreview] = useState(initialData?.image_url || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary-navy">
            {initialData ? 'Edit Luxury Item' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-gold outline-none"
                placeholder="e.g. Signature Leather Tote"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
              <input 
                type="number" 
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-gold outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent-gold outline-none"
              >
                <option value="">Select Category</option>
                <option value="bags">Bags</option>
                <option value="footwear">Footwear</option>
                <option value="accessorize">Accessorize</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-accent-gold outline-none resize-none"
                placeholder="Describe the craftmanship..."
              ></textarea>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden" 
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-accent-gold transition-colors block">
                  {preview ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-accent-gold font-bold text-sm">Tap to Replace Image</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="text-gray-300" />
                      <span className="text-gray-400 text-sm">Click to upload product media</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary-navy text-white py-4 rounded-xl font-bold mt-8 flex items-center justify-center gap-3 disabled:opacity-50 hover:shadow-lg transition-all tracking-widest text-sm uppercase"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={20} /> Processing Vault...</>
            ) : (
              initialData ? 'Save Modifications' : 'Add to Collection'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
