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
        .select('*, products(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      toast.error('Failed to retrieve review archive');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      const newVisibility = !currentVisibility;
      const { error } = await supabase
        .from('reviews')
        .update({ is_visible: newVisibility })
        .eq('id', id);
      
      if (error) throw error;
      toast.success(newVisibility ? 'Review is now visible' : 'Review has been hidden');
      setReviews(reviews.map(r => r.id === id ? { ...r, is_visible: newVisibility } : r));
    } catch (err) {
      toast.error('Visibility Toggle Failed');
    }
  };

  const saveReply = async (id, reply) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ admin_reply: reply })
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Reply saved successfully');
      setReviews(reviews.map(r => r.id === id ? { ...r, admin_reply: reply } : r));
    } catch (err) {
      toast.error('Reply Failed');
    }
  };

  const deleteReview = async (id) => {
    if (!confirm('Delete this review permanently?')) return;
    
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      toast.success('Review deleted successfully');
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      toast.error('Deletion Failed');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin text-[#C89B3C] mb-6" size={48} strokeWidth={1} />
        <p className="text-[#8B97A8] font-black uppercase tracking-[0.5em] text-[10px] opacity-40">Decrypting Sentiment...</p>
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
            <span className="h-[2px] w-8 bg-[#C89B3C]"></span>
            <span className="text-[#C89B3C] text-[9px] font-black uppercase tracking-[0.4em]">Review Control</span>
          </div>
          <h1 className="text-4xl font-serif italic text-white tracking-tight">Customer <span className="text-[#C89B3C] not-italic font-black uppercase text-3xl ml-2">Sentiment</span></h1>
        </div>
      </motion.header>

      <div className="bg-[#0B2545] rounded-[32px] border border-white/5 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="pl-10 pr-6 py-6 text-[9px] font-black text-[#8B97A8] uppercase tracking-[0.3em]">Contributor</th>
                <th className="px-6 py-6 text-[9px] font-black text-[#8B97A8] uppercase tracking-[0.3em]">Product</th>
                <th className="px-6 py-6 text-[9px] font-black text-[#8B97A8] uppercase tracking-[0.3em]">Rating</th>
                <th className="px-6 py-6 text-[9px] font-black text-[#8B97A8] uppercase tracking-[0.3em]">Review Message</th>
                <th className="px-6 py-6 text-[9px] font-black text-[#8B97A8] uppercase tracking-[0.3em]">Visibility</th>
                <th className="px-6 py-6 text-right pr-10 text-[9px] font-black text-[#8B97A8] uppercase tracking-[0.3em]">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reviews.map((rev, idx) => (
                <motion.tr 
                  key={rev.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`transition-all group relative ${!rev.is_visible ? 'opacity-50' : 'hover:bg-white/[0.02]'}`}
                >
                  <td className="pl-10 pr-6 py-8 align-top">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#C89B3C] border border-white/10">
                         <User size={18} />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-xs font-black text-white">{rev.customer_name}</span>
                         <span className="text-[10px] text-[#8B97A8] font-bold opacity-60 lowercase">{rev.customer_email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-8 align-top">
                    {rev.products?.name ? (
                      <span className="inline-block bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                        {rev.products.name}
                      </span>
                    ) : (
                      <span className="inline-block bg-white/5 text-white/40 border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        General
                      </span>
                    )}
                  </td>
                  
                  <td className="px-6 py-8 align-top">
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={10} 
                          className={i < rev.rating ? "fill-[#C89B3C] text-[#C89B3C]" : "text-white/10"} 
                        />
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-8 align-top max-w-md">
                    <div className="flex flex-col gap-4">
                       <p className="text-[11px] font-medium text-white/80 leading-relaxed italic">"{rev.review_message}"</p>
                       
                       {/* Reply Section */}
                       <div className="mt-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <label className="text-[8px] font-black uppercase tracking-widest text-[#C89B3C] mb-2 block">Admin Response</label>
                          <textarea 
                            id={`reply-${rev.id}`}
                            defaultValue={rev.admin_reply}
                            placeholder="Type reply here..."
                            className="w-full bg-transparent text-[11px] text-white/60 outline-none border-none resize-none min-h-[50px] placeholder:text-white/10"
                          />
                          <div className="flex justify-end mt-2 pt-2 border-t border-white/5">
                            <button 
                              onClick={() => {
                                const val = document.getElementById(`reply-${rev.id}`).value;
                                saveReply(rev.id, val);
                              }}
                              className="px-4 py-1.5 bg-[#C89B3C] text-[#0B2545] text-[9px] font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-all"
                            >
                              Save Reply
                            </button>
                          </div>
                       </div>

                       <span className="text-[9px] text-[#8B97A8] font-bold uppercase tracking-widest opacity-40">
                          {new Date(rev.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                       </span>
                    </div>
                  </td>

                  <td className="px-6 py-8 align-top">
                    <div className="flex flex-col gap-2">
                       <button 
                         onClick={() => toggleVisibility(rev.id, rev.is_visible)}
                         className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${
                            rev.is_visible 
                            ? 'text-emerald-400 border-emerald-400/20 hover:bg-emerald-400 hover:text-white' 
                            : 'text-amber-400 border-amber-400/20 hover:bg-amber-400 hover:text-white'
                         }`}
                       >
                         {rev.is_visible ? 'Hide Review' : 'Unhide Review'}
                       </button>
                       {!rev.is_visible && (
                         <span className="text-[8px] font-bold text-amber-400/60 uppercase tracking-widest text-center mt-1">Hidden from website</span>
                       )}
                    </div>
                  </td>

                  <td className="px-6 py-8 text-right pr-10 align-top">
                    <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => deleteReview(rev.id)}
                        className="p-3 bg-white/5 border border-white/10 text-[#8B97A8] hover:text-red-400 hover:border-red-400/40 rounded-xl transition-all"
                        title="Delete Review"
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
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="text-white/10" size={32} />
               </div>
               <h3 className="text-xl font-serif italic text-white mb-2">No Reviews Yet</h3>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B97A8]">Customer reviews will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
