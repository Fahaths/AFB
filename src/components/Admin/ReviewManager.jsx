'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Trash2, Star, MessageSquare, User, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ReviewManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          products (
            name,
            image_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      toast.error('Failed to retrieve feedback vault');
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    if (!confirm('Purge this testimonial?')) return;
    
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      toast.success('Testimonial Purged');
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      toast.error('Purge Failed');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin text-accent-gold mb-6" size={48} strokeWidth={1} />
        <p className="text-primary-navy font-black uppercase tracking-[0.5em] text-[10px] opacity-40">Decrypting Sentiment...</p>
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
            <span className="text-accent-gold text-[9px] font-black uppercase tracking-[0.4em]">Community Dialogue</span>
          </div>
          <h1 className="text-4xl font-serif italic text-primary-navy tracking-tight">Client <span className="text-accent-gold not-italic font-black uppercase text-3xl ml-2">Sentiment</span></h1>
        </div>
      </motion.header>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-[#FBFBFA]">
                <th className="pl-10 pr-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Contributor</th>
                <th className="px-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Associated Asset</th>
                <th className="px-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Valuation</th>
                <th className="px-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Narrative</th>
                <th className="px-6 py-6 text-right pr-10 text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reviews.map((rev, idx) => (
                <motion.tr 
                  key={rev.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="hover:bg-[#FDFCFB] transition-colors group relative"
                >
                  <td className="pl-10 pr-6 py-7">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-primary-navy border border-gray-100">
                         <User size={16} />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-xs font-black text-primary-navy">{rev.author_name}</span>
                         <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest opacity-60">Verified Admin</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                         {rev.products?.image_url ? (
                           <img src={rev.products.image_url} className="w-full h-full object-cover" alt="product" />
                         ) : (
                           <Package className="w-full h-full p-2 text-gray-200" />
                         )}
                      </div>
                      <span className="text-[10px] font-bold text-gray-600 max-w-[120px] truncate">{rev.products?.name || 'Archived Item'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={10} 
                          className={i < rev.rating ? "fill-accent-gold text-accent-gold" : "text-gray-200"} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    <div className="flex flex-col gap-1 max-w-sm">
                       <p className="text-[11px] font-medium text-gray-600 leading-relaxed line-clamp-2 italic">"{rev.content}"</p>
                       <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest opacity-40">
                          {new Date(rev.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-7 text-right pr-10">
                    <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <button 
                        onClick={() => deleteReview(rev.id)}
                        className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-500/40 hover:shadow-xl rounded-xl transition-all hover:-translate-y-0.5"
                        title="Purge Testimonial"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {reviews.length === 0 && (
            <div className="py-40 text-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="text-gray-200" size={32} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Dialogue reserves are currently empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
