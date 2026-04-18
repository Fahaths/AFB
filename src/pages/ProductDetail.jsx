import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus, Star, ThumbsUp, ThumbsDown, Check, Heart } from 'lucide-react';
import '../styles/ProductDetail.css';
import '../styles/Collection.css';
import '../styles/ProductReviews.css';

const products = [
  { id: 1, name: "Classic Navy Tote", price: 249, oldPrice: 399, cent: "00", specs: "L × W × H", val: "35×15×28", rating: 4.8, category: "bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80" },
  { id: 2, name: "Urban Duffel Bag", price: 559, oldPrice: 699, cent: "00", specs: "Capacity", val: "45 Liters", rating: 4.9, category: "bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80" },
  { id: 3, name: "Azure Handbag", price: 289, oldPrice: 420, cent: "00", specs: "L × W × H", val: "25×10×20", rating: 4.7, category: "bags", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80" },
  { id: 4, name: "Midnight Clutch", price: 159, oldPrice: 280, cent: "00", specs: "Style", val: "Evening", rating: 4.8, category: "bags", image: "https://images.unsplash.com/photo-1566150905458-1bf1fd111c91?auto=format&fit=crop&q=80" },
  { id: 5, name: "Heritage Oxford", price: 320, oldPrice: 559, cent: "00", specs: "Size (UK)", val: "7 - 11", rating: 4.9, category: "footwear", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80" },
  { id: 6, name: "Leather Loafers", price: 280, oldPrice: 450, cent: "00", specs: "Finish", val: "Suede", rating: 4.7, category: "footwear", image: "https://images.unsplash.com/photo-1614252235316-8c807d929837?auto=format&fit=crop&q=80" },
  { id: 7, name: "Gold Chronograph", price: 850, oldPrice: 1250, cent: "00", specs: "Case", val: "42mm", rating: 4.9, category: "accessorize", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

function Counter({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    const duration = 1500;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end.toFixed(1));
        clearInterval(timer);
      } else {
        setDisplayValue(start.toFixed(1));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
}

function TypingText({ text }) {
  const characters = text.split("");
  return (
    <motion.p style={{ color: '#444', lineHeight: '1.6' }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.03, delay: index * 0.02 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}

function Confetti() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: '50vw',
            y: '50vh',
            opacity: 1,
            scale: Math.random() * 0.5 + 0.5,
            rotate: 0
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: 0,
            rotate: 360
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: ['#0B1F3A', '#C89B3C', '#FFD700', '#f8f9fa'][Math.floor(Math.random() * 4)],
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}
    </div>
  );
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState(0);

  const [reviewsList, setReviewsList] = useState(() => {
    const saved = localStorage.getItem('afb_reviews');
    const initial = [
      { id: 1, name: "ELLY KOFANOVA", title: "ABSOLUTELY GREAT ITEM!!!!", text: "This item is exactly what I have been looking for. It looks like a more costly piece but that isn't why I chose it.", likes: 15, dislikes: 1, liked: false, disliked: false },
      { id: 2, name: "KATY TYPOVA", title: "I AM TOTALLY SATISFIED!", text: "I like the high quality finish, it fits perfectly and looks stunning in person. Delivery was very fast.", likes: 24, dislikes: 0, liked: false, disliked: false },
      { id: 3, name: "HELEN AUTOS", title: "THIS COLOUR IS PERFECT.", text: "You can't go wrong with this item. If you want a good everyday luxury piece, this is the one.", likes: 9, dislikes: 2, liked: false, disliked: false }
    ];
    return saved ? [...JSON.parse(saved), ...initial] : initial;
  });

  useEffect(() => {
    const found = products.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleLike = (reviewId) => {
    const updated = reviewsList.map(rev => {
      if (rev.id === reviewId) {
        return {
          ...rev,
          likes: rev.liked ? rev.likes - 1 : rev.likes + 1,
          liked: !rev.liked,
          disliked: false,
          dislikes: rev.disliked ? rev.dislikes - 1 : rev.dislikes
        };
      }
      return rev;
    });
    setReviewsList(updated);
    const userReviews = updated.filter(r => r.id > 10);
    localStorage.setItem('afb_reviews', JSON.stringify(userReviews));
  };

  const handleDislike = (reviewId) => {
    const updated = reviewsList.map(rev => {
      if (rev.id === reviewId) {
        return {
          ...rev,
          dislikes: rev.disliked ? rev.dislikes - 1 : rev.dislikes + 1,
          disliked: !rev.disliked,
          liked: false,
          likes: rev.liked ? rev.likes - 1 : rev.likes
        };
      }
      return rev;
    });
    setReviewsList(updated);
    const userReviews = updated.filter(r => r.id > 10);
    localStorage.setItem('afb_reviews', JSON.stringify(userReviews));
  };

  const [visibleCount, setVisibleCount] = useState(3);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', title: '', text: '', rating: 5 });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const reviewObj = {
      id: Date.now(),
      name: newReview.name.toUpperCase(),
      title: newReview.title.toUpperCase() || "GREAT PRODUCT",
      text: newReview.text,
      rating: newReview.rating,
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
      isNew: true
    };

    const updated = [reviewObj, ...reviewsList];
    setReviewsList(updated);
    const customReviews = updated.filter(r => r.id > 10);
    localStorage.setItem('afb_reviews', JSON.stringify(customReviews));

    setNewReview({ name: '', title: '', text: '', rating: 5 });
    setShowForm(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleWhatsApp = () => {
    const message = `Hello Al Fahath Bags! I'm interested in the ${product.name} (Qty: ${qty}) priced at $${product.price * qty}. Could you share more details?`;
    const waUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleCardWhatsApp = (e, p) => {
    e.stopPropagation();
    const message = `Hi! I'm interested in the ${p.name}. Could you share more details?`;
    const waUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  if (!product) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Loading...</div>;

  const marqueeProducts = products.filter(p => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 5);
  const marqueeItems = [...marqueeProducts, ...marqueeProducts];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="product-detail-page"
    >
      <div className="container" style={{ width: '100% !important', maxWidth: '100% !important', padding: '0 80px' }}>

        <motion.div variants={itemVariants} className="breadcrumb-nav">
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
          <span>/</span>
          <span onClick={() => navigate('/collection')} style={{ cursor: 'pointer' }}>{product.category}</span>
          <span>/</span>
          <span style={{ color: '#000' }}>{product.name}</span>
        </motion.div>

        <div className="pd-main-grid">
          <div className="pd-left-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="pd-gallery-box"
            >
              <button className="pd-nav-ctrl left">
                <ChevronLeft size={24} />
              </button>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={product.image}
                alt={product.name}
                className="pd-main-img-scaled"
              />
              <button className="pd-nav-ctrl right">
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </div>

          <div className="pd-right-col">
            <motion.div variants={itemVariants} className="rating-stars-top">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              <span>4.6 Stars</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="pd-title-new">{product.name}</motion.h1>

            <motion.p variants={itemVariants} className="pd-description">
              Elevate your style with our premium {product.category}, meticulously handcrafted for quality and durability. This exquisite piece features authentic materials and a timeless design that fits perfectly into any modern wardrobe.
            </motion.p>

            <motion.div variants={itemVariants} className="features-list">
              {['Planet-friendly', 'Effortless use', 'Purpose-built'].map((f, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-check"><Check size={14} strokeWidth={3} /></div>
                  {f}
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="action-row" style={{ marginTop: '20px' }}>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#25D366' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                style={{
                  background: '#0B1F3A',
                  color: '#fff',
                  width: '100%',
                  padding: '22px',
                  borderRadius: '18px',
                  fontWeight: '800',
                  fontSize: '18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enquire on WhatsApp
                </div>
                <span>${product.price}</span>
              </motion.button>
            </motion.div>
            <motion.div variants={itemVariants} className="pd-extended-details">
              <div className="detail-item">
                <span className="detail-label">Size & Compartment</span>
                <span className="detail-val">{product.val} (L × W × H)</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Materials</span>
                <span className="detail-val">Premium Tuscan Leather, 24K Gold Plated Hardware</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <motion.section
          id="reviews"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="reviews-section"
        >
          {showConfetti && <Confetti />}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
            <h2 className="reviews-title" style={{ margin: 0 }}>CUSTOMER FEEDBACK</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
              style={{ background: '#C89B3C', color: '#fff', padding: '15px 30px', fontWeight: '800', borderRadius: '4px', letterSpacing: '1px' }}
            >
              {showForm ? "CANCEL" : "WRITE A REVIEW"}
            </motion.button>
          </div>

          {showForm && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              onSubmit={handleReviewSubmit}
              className="review-form-box"
              style={{ marginBottom: '80px', background: '#fff', padding: '60px', borderRadius: '20px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '50px' }}
              >
                <h3
                  style={{
                    color: '#0B1F3A',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '32px',
                    fontWeight: '700',
                    margin: '0 0 10px 0',
                    textTransform: 'uppercase'
                  }}
                >
                  Share Your Experience
                </h3>
                <p
                  style={{
                    color: '#999',
                    fontSize: '14px',
                    letterSpacing: '1px',
                  }}
                >
                  Your feedback helps others choose better
                </p>
              </motion.div>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', justifyContent: 'center' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    fill={i < newReview.rating ? "#C89B3C" : "none"}
                    color={i < newReview.rating ? "#C89B3C" : "#fff"}
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  />
                ))}
              </div>
              <div className="luxury-form-grid">
                <div className="luxury-input-group">
                  <input
                    type="text"
                    id="name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder=" "
                    required
                    className="luxury-field"
                  />
                  <label htmlFor="name" className="floating-label">Full Name</label>
                  <div className="glow-border"></div>
                </div>

                <div className="luxury-input-group">
                  <input
                    type="text"
                    id="title"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    placeholder=" "
                    className="luxury-field"
                  />
                  <label htmlFor="title" className="floating-label">Review Title</label>
                  <div className="glow-border"></div>
                </div>
              </div>

              <div className="luxury-input-group full-width" style={{ marginTop: '30px' }}>
                <textarea
                  id="text"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder=" "
                  required
                  className="luxury-field"
                  style={{ minHeight: '120px', resize: 'none' }}
                />
                <label htmlFor="text" className="floating-label">Your Thoughts</label>
                <div className="glow-border"></div>
              </div>
              <motion.button
                whileHover={{ backgroundColor: '#fff', color: '#0B1F3A', scale: 1.02 }}
                style={{ width: '100%', background: '#C89B3C', color: '#fff', padding: '22px', border: 'none', fontWeight: '800', fontSize: '16px', letterSpacing: '2px', borderRadius: '12px', marginTop: '20px' }}
              >
                POST REVIEW
              </motion.button>
            </motion.form>
          )}

          <div className="rating-summary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '80px' }}>
            <div style={{ color: '#C89B3C', display: 'flex' }}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star size={28} fill="currentColor" />
                </motion.div>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              style={{ fontWeight: '900', fontSize: '42px', color: '#0B1F3A' }}
            >
              <Counter value={4.9} />
              <span style={{ fontSize: '18px', color: '#999', marginLeft: '15px', fontWeight: '400' }}>({reviewsList.length} REVIEWS)</span>
            </motion.span>
          </div>

          <div className="product-reviews-grid">
            <AnimatePresence mode="popLayout">
              {reviewsList.slice(0, visibleCount).map((r, i) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: (i % 3) * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="product-review-card"
                >
                  <div className="product-review-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span className="product-reviewer-name">{r.name}</span>
                    <span className="verified-tag-small">VERIFIED</span>
                  </div>
                  
                  <div className="product-review-stars">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={j < r.rating ? "currentColor" : "none"} />)}
                  </div>

                  <div className="product-review-content">
                    <h4 className="product-review-title">{r.title}</h4>
                    {r.isNew ? <TypingText text={r.text} /> : <p className="product-review-text">{r.text}</p>}
                  </div>
                  
                  <div className="product-review-footer">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(r.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        cursor: 'pointer', color: r.liked ? '#C89B3C' : '#999',
                        fontSize: '12px'
                      }}
                    >
                      <ThumbsUp size={14} fill={r.liked ? "#C89B3C" : "none"} />
                      <span style={{ fontWeight: '800' }}>HELPFUL ({r.likes})</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {reviewsList.length > 3 && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <motion.button
                whileHover={{ backgroundColor: '#0B1F3A', color: '#fff', scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => visibleCount < reviewsList.length ? setVisibleCount(prev => prev + 3) : setVisibleCount(3)}
                style={{ background: 'transparent', border: '2px solid #0B1F3A', color: '#0B1F3A', padding: '18px 50px', fontWeight: '800', letterSpacing: '2px' }}
              >
                {visibleCount < reviewsList.length ? "VIEW MORE REVIEWS" : "VIEW LESS REVIEWS"}
              </motion.button>
            </div>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="related-section"
          style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}
        >
          <h2 className="related-title">CUSTOMERS ALSO VIEWED</h2>
          <div className="marquee-wrapper">
            <div
              className="marquee-content marquee-anim"
              style={{ display: 'flex', gap: '40px', padding: '20px' }}
            >
              {marqueeItems.map((p, i) => (
                <motion.div
                  key={`${p.id}-${i}`}
                  className="related-col-card"
                  onClick={() => navigate(`/product/${p.id}`)}
                  style={{ cursor: 'pointer', flexShrink: 0, width: '340px', textAlign: 'left' }}
                >
                  <div className="related-img-box">
                    <img src={p.image} alt={p.name} />
                  </div>

                  <div className="related-meta-row">
                    <div className="meta-box dimension-box">
                      <span className="meta-label">{p.specs}</span>
                      <span className="meta-value">{p.val}</span>
                    </div>

                    <div className="meta-box rating-box">
                      <Star size={18} fill="#FFB800" color="#FFB800" />
                      <span className="meta-value">{p.rating}</span>
                    </div>

                    <div className="meta-box heart-box" onClick={(e) => e.stopPropagation()}>
                      <Heart size={20} />
                    </div>

                    <button className="meta-wa-btn" onClick={(e) => handleCardWhatsApp(e, p)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                </div>

                <div className="related-details">
                  <div className="related-title-box">
                    <span className="brand-cap">{p.category}</span>
                    <h3 className="name-serif">{p.name}</h3>
                  </div>
                  <div className="related-price">
                    <span className="price-symbol">$</span>
                    <span className="price-val">{p.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  </motion.div>
);
};

export default ProductDetail;
