'use client';

import { Edit3, Trash2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductTable({ products, onEdit, onDelete, mounted }) {
  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-50 bg-[#FBFBFA]">
            <th className="pl-10 pr-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Exhibition Asset</th>
            <th className="px-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Classification</th>
            <th className="px-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Value</th>
            <th className="px-6 py-6 text-right pr-10 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((p, idx) => (
            <motion.tr 
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="hover:bg-[#FDFCFB] transition-colors group relative"
            >
              <td className="pl-10 pr-6 py-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-primary-navy text-sm leading-tight mb-1">{p.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono italic opacity-60">ID: {p.id.substring(0, 8)}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-400 text-[9px] font-black uppercase tracking-widest border border-gray-100">
                    {p.category}
                  </span>
                  {p.type && (
                    <span className="px-2.5 py-1 rounded-lg bg-accent-gold/5 text-accent-gold text-[9px] font-black uppercase tracking-widest border border-accent-gold/10">
                      {p.type}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-6">
                <span className="text-sm font-black text-primary-navy/80 tracking-tighter">${p.price}</span>
              </td>
              <td className="px-6 py-6 text-right pr-10">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <button 
                    onClick={() => onEdit(p)} 
                    className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-accent-gold hover:border-accent-gold/40 hover:shadow-xl rounded-xl transition-all hover:-translate-y-0.5"
                    title="Modify"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(p)} 
                    className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-500/40 hover:shadow-xl rounded-xl transition-all hover:-translate-y-0.5"
                    title="Purge"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="p-32 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="text-gray-200" size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Archival Vault is currently empty.</p>
        </div>
      )}
    </div>
  );
}
