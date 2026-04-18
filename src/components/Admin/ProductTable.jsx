'use client';

import { Edit3, Trash2, Image as ImageIcon } from 'lucide-react';

export default function ProductTable({ products, onEdit, onDelete, mounted }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date Added</th>
            <th className="px-4 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-50">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{p.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{p.id.substring(0, 8)}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className="px-3 py-1 bg-primary-navy/5 text-primary-navy text-[10px] font-black rounded-full uppercase tracking-tighter shadow-sm">
                  {p.category || 'Standard'}
                </span>
              </td>
              <td className="px-6 py-5 font-mono text-gray-600 font-bold tracking-tighter">${p.price}</td>
              <td className="px-6 py-5 text-xs text-gray-400 font-medium">
                {mounted && new Date(p.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </td>
              <td className="px-6 py-5 text-right space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onEdit(p)} 
                  className="p-2.5 text-gray-400 hover:text-accent-gold hover:bg-accent-gold/5 rounded-lg transition-all"
                  title="Edit Product"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => onDelete(p)} 
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Archive Product"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="p-20 text-center text-gray-400">
          <ImageIcon className="mx-auto mb-4 opacity-20" size={48} />
          <p className="font-medium">No inventory items detected in the vault.</p>
        </div>
      )}
    </div>
  );
}
