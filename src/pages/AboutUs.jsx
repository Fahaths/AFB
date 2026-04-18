import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '120px', paddingBottom: '80px' }}
    >
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontSize: '2.3rem', marginBottom: '20px', textAlign: 'center' }}>
          About <span style={{ color: 'var(--accent-gold)' }}>AFB LUXE</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px', textAlign: 'center' }}>
          AFB LUXE is built on craftsmanship, premium materials, and timeless design. We create handbags and
          footwear that combine luxury aesthetics with practical everyday use.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginTop: '30px' }}>
          <div style={{ padding: '24px', border: '1px solid #e7e7e7', borderRadius: '10px', backgroundColor: '#fff' }}>
            <h3 style={{ marginBottom: '10px' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              Deliver high-quality fashion essentials with modern designs and long-lasting value.
            </p>
          </div>
          <div style={{ padding: '24px', border: '1px solid #e7e7e7', borderRadius: '10px', backgroundColor: '#fff' }}>
            <h3 style={{ marginBottom: '10px' }}>Our Promise</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              Ethical sourcing, careful finishing, and a customer-first shopping experience.
            </p>
          </div>
          <div style={{ padding: '24px', border: '1px solid #e7e7e7', borderRadius: '10px', backgroundColor: '#fff' }}>
            <h3 style={{ marginBottom: '10px' }}>Our Vision</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              Become a trusted global label for premium bags and footwear collections.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
