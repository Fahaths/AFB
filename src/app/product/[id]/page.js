'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Common/Navbar';
import Link from 'next/link';
import { Star, Check, Loader2, MessageSquare, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ProductCard from '@/components/Product/ProductCard';

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setMounted(true);
    async function fetchData() {
      setLoading(true);
      const { data: prodData, error: prodError } = await supabase.from('products').select('*').eq('id', id).single();
      const { data: revData, error: revError } = await supabase.from('reviews').select('*').eq('product_id', id).order('created_at', { ascending: false });
      
      if (!prodError) {
        setProduct(prodData);
        setActiveImage(prodData.image_url);
        
        // Fetch Related Products from same category
        const { data: relData } = await supabase
          .from('products')
          .select('*')
          .eq('category', prodData.category)
          .neq('id', id)
          .limit(3);
        setRelatedProducts(relData || []);
      }
      if (!revError) setReviews(revData || []);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const productGallery = product ? (
    product.images && product.images.length > 0 ? product.images : [
      product.image_url,
      product.image_url,
      product.image_url,
      product.image_url,
      product.image_url
    ]
  ) : [];

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${product.name} priced at $${product.price}. Could you share more details?`;
    const waUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
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
      
      <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 overflow-hidden">
          <Link href="/collection" className="hover:text-primary-navy transition-colors">Collection</Link>
          <span className="text-gray-200">/</span>
          <Link href={`/collection/${product.category?.toLowerCase()}`} className="hover:text-primary-navy transition-colors">{product.category || 'General'}</Link>
          <span className="text-gray-200">/</span>
          <span className="text-primary-navy truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Enhanced Image Gallery (Sidebar Style) */}
          <div className="lg:col-span-7 grid grid-cols-5 gap-4">
            {/* Thumbnails Sidebar */}
            <div className="flex flex-col gap-4">
              {productGallery.slice(1).map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square bg-white rounded-2xl p-3 border cursor-pointer transition-all overflow-hidden group ${
                    activeImage === img ? 'border-[#C89B3C] shadow-lg scale-105' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                   <img 
                    src={img} 
                    alt={`Detail ${i+1}`} 
                    className={`w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ${
                      activeImage === img ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                </div>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="col-span-4 bg-white rounded-[40px] p-10 md:p-16 aspect-[4/5] flex items-center justify-center shadow-sm border border-gray-50 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </AnimatePresence>
              <div className="absolute top-8 right-8">
                <span className="bg-accent-gold/5 text-accent-gold border border-accent-gold/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            <h1 className="text-4xl md:text-5xl font-black text-primary-navy font-serif leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed">
              {product.description || `Experience unparalleled craftmanship with the ${product.name}. A testament to luxury and timeless design.`}
            </p>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                }
              }}
              initial="hidden"
              animate="show"
              className="flex gap-4 flex-wrap"
            >
              {[
                ...(product.material ? [{ type: 'material', val: product.material, icon: <Sparkles size={14} className="text-primary-navy" /> }] : []),
                ...(product.tags?.map(t => ({ type: 'tag', val: t, icon: <Sparkles size={14} className="text-primary-navy" /> })) || []),
                ...((!product.tags?.length && !product.material) ? ['Italian Leather', 'Gold Hardware', 'Limited Edition'].map(t => ({ type: 'fallback', val: t, icon: <Sparkles size={14} className="text-primary-navy" /> })) : [])
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 15 },
                    show: { opacity: 1, scale: 1, y: 0 }
                  }}
                  transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-br from-white to-[#FAF9F6] border border-accent-gold/30 rounded-2xl shadow-xl shadow-navy-900/[0.03] transition-all cursor-default group"
                >
                  <div className="w-6 h-6 rounded-lg bg-accent-gold/5 flex items-center justify-center transition-transform group-hover:rotate-12">
                    {item.type === 'material' && <Plus size={12} className="text-primary-navy" />}
                    {item.type === 'tag' && <Sparkles size={12} className="text-primary-navy" />}
                    {item.type === 'fallback' && <Check size={12} className="text-primary-navy" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-accent-gold mb-0.5 leading-none">
                      {item.type === 'material' ? 'Composition' : 'Legacy Tag'}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-navy leading-none">
                       {item.val}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8">
              {/* Enquiry Button */}
              <button 
                onClick={handleWhatsApp}
                className="w-full bg-accent-gold text-white py-6 rounded-[24px] font-black text-xl flex items-center justify-center gap-4 transition-all hover:bg-[#25D366] hover:scale-[1.02] shadow-xl shadow-accent-gold/20 hover:shadow-green-500/20"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  width="28" 
                  height="28" 
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                </svg>
                <span>Enquire Price via WhatsApp</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
               <div className="bg-white p-5 rounded-3xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dimensions</p>
                <p className="text-sm font-black text-primary-navy truncate">{product.val || 'Standard Luxury'}</p>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Item Code</p>
                <p className="text-sm font-black text-primary-navy">
                  {product.item_code || `AFB-${id.substring(0, 4).toUpperCase()}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Full Width Stack */}
        <div className="mt-32 pt-20 border-t border-gray-200">
          <div className="flex justify-between items-center mb-16 px-2">
            <div>
              <h2 className="text-4xl font-black text-primary-navy font-serif">Customer Feedback</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex text-accent-gold">
                  {[...Array(5)].map((_, i) => {
                    const avg = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 5;
                    return <Star key={i} size={20} fill={i < Math.round(avg) ? "currentColor" : "none"} />;
                  })}
                </div>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  ({reviews.length} Experiences)
                </span>
                {reviews.length > 0 && (
                  <span className="text-accent-gold font-black text-sm ml-2">
                    {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
                  </span>
                )}
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
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 mb-16 overflow-hidden max-w-4xl mx-auto"
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
                  <div className="flex items-center gap-1 bg-primary-navy/5 text-primary-navy px-3 py-1 rounded-full text-[9px] font-bold tracking-widest border border-primary-navy/10">
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
            <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200 mt-12">
              <MessageSquare className="mx-auto text-gray-200 mb-4" size={40} />
              <p className="text-gray-400 font-serif italic text-xl">Be the first to share your experience.</p>
            </div>
          )}
        </div>

        {/* Related Products Section - Full Width Topic */}
        <div className="mt-32 pt-20 border-t border-gray-200">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-black text-primary-navy font-serif italic capitalize">Related <span className="text-accent-gold">Exquisite</span> Treasures</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relProduct, idx) => (
                <motion.div
                  key={relProduct.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <ProductCard product={relProduct} />
                </motion.div>
              ))
            ) : (
              [
                { id: 'd1', name: "Midnight Noir Handbag", price: 1850, category: "bags", material: "Saffiano", image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop" },
                { id: 'd2', name: "Emerald Velvet Slippers", price: 650, category: "footwear", material: "Velvet", image_url: "https://images.unsplash.com/photo-1619441207908-42622abd2c1d?q=80&w=2071&auto=format&fit=crop" },
                { id: 'd3', name: "Gold-Trimmed Chronograph", price: 12400, category: "accessories", material: "18k Gold", image_url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop" }
              ].map((dummy, idx) => (
                <motion.div
                  key={dummy.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <ProductCard product={dummy} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
