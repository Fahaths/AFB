'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Check, Loader2, Sparkles, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ClientReflections() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (!error) setReviews(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const { data, error } = await supabase
      .from('reviews')
      .insert([{
        customer_name: formData.name,
        customer_email: formData.email,
        review_message: formData.message,
        rating: formData.rating,
        is_visible: true
      }])
      .select();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Thank you for sharing your reflection!');
      if (data) setReviews([data[0], ...reviews]);
      setFormData({ name: '', email: '', message: '', rating: 5 });
      setShowForm(false);
    }
    setSubmitting(false);
  };

  return (
    <section className="py-24 bg-[#F7F3EE]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-[7%]">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-10 bg-[#C89B3C]"></span>
              <span className="text-[#C89B3C] font-black uppercase tracking-[0.5em] text-[10px]">Community Narrative</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif italic text-[#071B34] mb-6">
              Client <span className="not-italic font-bold">Reflections.</span>
            </h2>
            <p className="text-[#7A7A7A] text-lg font-medium leading-relaxed">
              Experiences shared by our community. Each story is a fragment of our shared legacy.
            </p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-10 py-4 border border-[#071B34]/10 text-[#071B34] font-black uppercase tracking-[0.3em] text-[10px] rounded-xl hover:bg-[#071B34] hover:text-white transition-all duration-500"
          >
            {showForm ? 'Close Experience' : 'Share Reflection'}
          </button>
        </div>

        {/* Integrated Submission Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-24"
            >
              <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 rounded-[40px] shadow-sm border border-gray-100 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                   <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Full Designation</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-14 bg-gray-50 border border-transparent rounded-2xl px-6 outline-none focus:border-[#C89B3C] transition-all text-sm"
                      placeholder="e.g. Julian Vane"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Email Archive</label>
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full h-14 bg-gray-50 border border-transparent rounded-2xl px-6 outline-none focus:border-[#C89B3C] transition-all text-sm"
                      placeholder="vane@legacy.com"
                    />
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Valuation</label>
                  <div className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-2xl">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        fill={i < formData.rating ? "#C89B3C" : "none"} 
                        color={i < formData.rating ? "#C89B3C" : "#D1D5DB"}
                        onClick={() => setFormData({...formData, rating: i + 1})}
                        className="cursor-pointer transition-transform hover:scale-110"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-10">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">The Narrative</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    style={{ height: '180px', borderRadius: '28px', padding: '28px' }}
                    className="w-full bg-gray-50 border border-transparent outline-none focus:border-[#C89B3C] transition-all resize-none text-sm leading-relaxed"
                    placeholder="Describe your encounter with Al Fahath..."
                  />
                </div>

                <button 
                  disabled={submitting}
                  style={{ background: '#C89B3C', color: '#071B34', height: '58px', borderRadius: '18px', fontWeight: '600' }}
                  className="w-full font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 hover:scale-[1.02] transition-all disabled:opacity-50 shadow-xl shadow-[#C89B3C]/10"
                >
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <>Submit Review</>}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry-style Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#C89B3C]" size={32} />
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {reviews.map((rev) => (
              <motion.div 
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="break-inside-avoid bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-700"
              >
                <div className="flex justify-between items-start mb-6">
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#071B34]">{rev.customer_name}</span>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < rev.rating ? "#C89B3C" : "none"} color={i < rev.rating ? "#C89B3C" : "#eee"} />)}
                      </div>
                   </div>
                   <div className="px-3 py-1 bg-[#071B34]/5 text-[#071B34] rounded-full text-[8px] font-black uppercase tracking-widest border border-[#071B34]/10">
                      Verified
                   </div>
                </div>
                
                <p className="text-[#7A7A7A] text-[15px] font-medium leading-relaxed italic mb-6">
                  "{rev.review_message}"
                </p>

                {rev.admin_reply && (
                  <div className="mt-4 pt-6 border-t border-gray-50">
                    <div className="bg-[#F7F3EE]/50 p-6 rounded-2xl relative">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#C89B3C] mb-2 block">Response</span>
                      <p className="text-xs text-[#071B34]/70 leading-relaxed italic font-medium">
                        {rev.admin_reply}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 text-[8px] font-black uppercase tracking-[0.2em] text-gray-300">
                  {new Date(rev.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && reviews.length === 0 && !showForm && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
            <MessageSquare className="mx-auto text-gray-200 mb-4" size={40} />
            <p className="text-gray-400 font-serif italic text-xl">Archive awaiting community narratives.</p>
          </div>
        )}
      </div>
    </section>
  );
}
