import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [length]);

  if (!Array.isArray(slides) || slides.length <= 0) return null;

  return (
    <div className="hero-slider" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: '#000' }}>

      {/* Background Images with Fade and Slow Zoom */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1, ease: "easeInOut" },
            scale: { duration: 6, ease: "linear" }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${slides[current].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}
        />
      </AnimatePresence>

      {/* Navy Gradient Overlay (Left to Right) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.4) 50%, rgba(11,31,58,0.1) 100%)',
        zIndex: 2
      }} />

      {/* Fixed Text Content - No Movement Between Slides */}
      <div style={{
        position: 'absolute',
        left: '6%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        maxWidth: '90%',
        pointerEvents: 'none'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{ pointerEvents: 'auto' }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#ffffff',
            lineHeight: '1.1',
            marginBottom: '25px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }}>
            Al Fahath Bag's <span style={{ color: '#C89B3C' }}>and</span> Footwear
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#dddddd',
            marginBottom: '45px',
            fontWeight: '300',
            lineHeight: '1.6'
          }}>
            Discover the new standard of elegance. Handcrafted excellence for the modern lifestyle.
          </p>
          <div>
            <a href="/collection" className="btn-luxury-outline">
              EXPLORE COLLECTION
            </a>
          </div>
        </motion.div>
      </div>

      {/* Slider Indicators (Lines) */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 20
      }}>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              width: '40px',
              height: '3px',
              background: current === index ? '#C89B3C' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
