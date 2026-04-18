import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [current, length]);

  if (!Array.isArray(slides) || slides.length <= 0) return null;

  return (
    <div className="hero-slider" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: 'var(--primary-navy)' }}>

      {/* Sliding Background Images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(90deg, rgba(11,31,58,0.7) 0%, rgba(11,31,58,0.1) 100%), url(${slides[current].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}
        />
      </AnimatePresence>

      {/* Fixed Text Overlay (Stationary) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div className="container" style={{ pointerEvents: 'auto' }}>
          <div style={{ maxWidth: '600px', textAlign: 'left' }}>
            <span style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '15px' }}>
              Handcrafted Excellence
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#ffffff', lineHeight: '1.1', marginBottom: '25px', fontFamily: 'var(--font-heading)' }}>
              {slides[0]?.title || "The Signature Collection"}
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', fontWeight: '300', maxWidth: '500px' }}>
              {slides[0]?.subtitle || "Discover our range of premium leather bags designed for the modern lifestyle."}
            </p>
            <div>
              <a href="#collection" className="btn-luxury">View Catalog</a>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', background: 'rgba(255,255,255,0.1)', zIndex: 20 }}>
        <motion.div
          key={current}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, ease: "linear" }}
          style={{ height: '100%', background: 'var(--accent-gold)' }}
        />
      </div>
    </div>
  );
};

export default HeroSlider;
