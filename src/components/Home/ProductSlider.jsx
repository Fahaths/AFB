import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const ProductSlider = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);
  
  // Take latest 5 products in reverse order
  const latestProducts = [...products].reverse().slice(0, 5);
  const totalItems = latestProducts.length;

  useEffect(() => {
    const updateItemsVisible = () => {
      if (window.innerWidth < 640) setItemsVisible(1);
      else if (window.innerWidth < 1024) setItemsVisible(2);
      else setItemsVisible(3);
    };
    
    updateItemsVisible();
    window.addEventListener('resize', updateItemsVisible);
    return () => window.removeEventListener('resize', updateItemsVisible);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 >= totalItems ? 0 : prev + 1));
  }, [totalItems]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalItems - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (totalItems === 0) return null;

  return (
    <div className="product-slider-container" style={{ position: 'relative', padding: '20px 0' }}>
      <div className="slider-viewport" style={{ overflow: 'hidden', margin: '0 auto', maxWidth: '1200px' }}>
        <motion.div
          className="slider-track"
          animate={{ x: `-${currentIndex * (100 / itemsVisible)}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            display: 'flex',
            width: `${(totalItems / itemsVisible) * 100}%`,
          }}
        >
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="product-slide"
              style={{
                width: `${100 / totalItems}%`,
                padding: '0 12px',
                boxSizing: 'border-box'
              }}
            >
              <motion.div
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  maxWidth: '260px',
                  margin: '0 auto'
                }}
              >
                <div style={{ 
                  height: '200px', 
                  width: '100%', 
                  overflow: 'hidden', 
                  borderRadius: '8px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={product.image}
                    alt={product.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain' 
                    }}
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '1.2rem', 
                    marginBottom: '8px',
                    color: 'var(--primary-navy)'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '0.85rem', 
                    marginBottom: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </p>
                  <span style={{ 
                    color: 'var(--accent-gold)', 
                    fontWeight: '700', 
                    fontSize: '1.1rem',
                    display: 'block'
                  }}>
                    ${product.price}
                  </span>
                </div>

                <a
                  href={`https://wa.me/1234567890?text=Hi, I am interested in the ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury"
                  style={{ 
                    justifyContent: 'center', 
                    fontSize: '0.75rem', 
                    padding: '12px', 
                    gap: '8px',
                    background: 'var(--primary-navy)',
                    color: '#fff',
                    borderRadius: '8px',
                    width: '100%'
                  }}
                >
                  <MessageCircle size={16} />
                  WHATSAPP ENQUIRY
                </a>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          cursor: 'pointer',
          color: 'var(--primary-navy)'
        }}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          cursor: 'pointer',
          color: 'var(--primary-navy)'
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '8px', 
        marginTop: '30px' 
      }}>
        {latestProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: index === currentIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: index === currentIndex ? 'var(--accent-gold)' : '#ccc',
              transition: 'all 0.3s ease',
              border: 'none',
              padding: 0,
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
