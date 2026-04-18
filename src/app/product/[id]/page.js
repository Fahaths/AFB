'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Common/Navbar';
import { Star, Check, Loader2, MessageSquare, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [prodRes, revRes] = await Promise.all([
        supabase.from('products').select('*').eq('id', id).single(),
        supabase.from('reviews').select('*').eq('product_id', id).order('created_at', { ascending: false })
      ]);

      console.log('ProductDetail: Fetch Product - Data:', prodRes.data);
      if (prodRes.error) console.error('ProductDetail: Fetch Product - Error:', prodRes.error);
      
      console.log('ProductDetail: Fetch Reviews - Data:', revRes.data);
      if (revRes.error) console.error('ProductDetail: Fetch Reviews - Error:', revRes.error);

      if (prodRes.error) toast.error('Product not found');
      else setProduct(prodRes.data);

      if (!revRes.error) setReviews(revRes.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${product.name} priced at $${product.price}. Could you share more details?`;
    const waUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const onAddToCart = () => {
    addToCart(product);
    toast.success('Added to bag!', {
      icon: '👜',
      style: {
        borderRadius: '16px',
        background: '#0B1F3A',
        color: '#fff',
        fontWeight: 'bold'
      }
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ 
        product_id: id, 
        name: reviewForm.name, 
        rating: reviewForm.rating, 
        comment: reviewForm.comment 
      }])
      .select();

    if (error) {
      toast.error(error.message);
    } else {
      setReviews([data[0], ...reviews]);
      setReviewForm({ name: '', rating: 5, comment: '' });
      setShowReviewForm(false);
      toast.success('Thank you for your review!');
    }
    setSubmittingReview(false);
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F6F4]">
      <Loader2 className="animate-spin text-accent-gold" size={48} />
      <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs">Accessing Luxury...</p>
    </div>
  );

  if (!mounted) return null;

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F6F4]">
      <h1 className="font-serif text-3xl">This item has been archived.</h1>
      <button onClick={() => window.history.back()} className="mt-6 text-accent-gold font-bold underline">Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F6F4]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] p-10 md:p-16 aspect-square flex items-center justify-center shadow-sm"
          >
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Right: Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-accent-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              <span className="text-gray-400 text-sm font-medium ml-2">Verified Authenticity</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-primary-navy font-serif leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed">
              {product.description || `Experience unparalleled craftmanship with the ${product.name}. A testament to luxury and timeless design.`}
            </p>

            <div className="flex gap-4 flex-wrap">
              {['Italian Leather', 'Gold Hardware', 'Signature Series'].map(tag => (
                <div key={tag} className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-100">
                  <div className="w-5 h-5 bg-accent-gold/10 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-accent-gold" strokeWidth={4} />
                  </div>
                  {tag}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              {/* Add to Cart Button */}
              <button 
                onClick={onAddToCart}
                className="w-full bg-accent-gold text-white py-6 rounded-[24px] font-black text-xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] shadow-xl shadow-accent-gold/20"
              >
                <ShoppingBag size={24} strokeWidth={3} />
                <span>Add to Bag</span>
                <span className="ml-4 opacity-50 font-medium">|</span>
                <span className="ml-2 font-black">${product.price}</span>
              </button>

              {/* Enquiry Button */}
              <button 
                onClick={handleWhatsApp}
                className="w-full border-2 border-primary-navy text-primary-navy py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 transition-all hover:bg-primary-navy hover:text-white"
              >
                <motion.span whileHover={{ x: 5 }}>Enquire via WhatsApp</motion.span>
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-5 rounded-3xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dimensions</p>
                <p className="text-sm font-bold text-gray-900">{product.val || 'N/A'}</p>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Item Code</p>
                <p className="text-sm font-bold text-gray-900">AFB-{id.substring(0, 4).toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-32 pt-20 border-t border-gray-200">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-black text-primary-navy font-serif">Customer Feedback</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex text-accent-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">({reviews.length} Experiences)</span>
              </div>
            </div>
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-white border-2 border-gray-100 text-gray-400 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:border-accent-gold hover:text-accent-gold transition-all"
            >
              {showReviewForm ? 'Cancel' : 'Share Experience'}
            </button>
          </div>

          <AnimatePresence>
            {showReviewForm && (
              <motion.form 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={submitReview}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 mb-16 overflow-hidden"
              >
                <h3 className="text-2xl font-serif font-bold text-primary-navy mb-8 text-center italic">Your Thoughts Matter</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">Your Name</label>
                    <input 
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                      className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent-gold/20"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">Rating</label>
                    <div className="flex gap-4 items-center h-full px-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={24} 
                          fill={i < reviewForm.rating ? "#C89B3C" : "none"} 
                          color={i < reviewForm.rating ? "#C89B3C" : "#ddd"}
                          onClick={() => setReviewForm({...reviewForm, rating: i + 1})}
                          className="cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-full flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1">Your Experience</label>
                    <textarea 
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      rows="4"
                      className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-accent-gold/20 resize-none"
                      placeholder="Meticulously crafted, exceeded expectations..."
                    ></textarea>
                  </div>
                </div>
                <button 
                  disabled={submittingReview}
                  className="w-full bg-accent-gold text-white font-black py-5 rounded-2xl mt-10 hover:bg-[#b08935] transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-sm"
                >
                  {submittingReview ? 'Dispatching...' : 'Submit Feedback'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <motion.div 
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-primary-navy">{rev.name}</span>
                  <div className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest border border-green-100">
                    <Check size={10} strokeWidth={4} /> VERIFIED
                  </div>
                </div>
                <div className="flex gap-1 text-accent-gold mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />)}
                </div>
                <p className="text-gray-600 leading-relaxed font-medium">"{rev.comment}"</p>
                <div className="product-review-footer">
                  {mounted && (
                    <span className="mt-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </span>
                  )}
                 </div>
              </motion.div>
            ))}
          </div>

          {reviews.length === 0 && !showReviewForm && (
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
              <MessageSquare className="mx-auto text-gray-200 mb-4" size={40} />
              <p className="text-gray-400 font-serif italic text-xl">Be the first to share your experience.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
