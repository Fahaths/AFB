import React from 'react';
import { motion } from 'framer-motion';
import HeroSlider from '../components/Home/HeroSlider';
import ProductSlider from '../components/Home/ProductSlider';
import { useGlobal } from '../context/GlobalContext';

const Home = () => {
  const { products, heroSlides } = useGlobal();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSlider slides={heroSlides} />

      {/* Collection Section */}
      <section id="collection">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: '2.2rem' }}
            >
              Latest Transitions
            </motion.h2>
          </div>

          <ProductSlider products={products} />
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" style={{ backgroundColor: '#ffffff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80" 
              alt="Quality Craftsmanship" 
              style={{ width: '100%', borderRadius: '4px', boxShadow: 'var(--shadow-subtle)' }} 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.2rem', marginBottom: '24px' }}>Artisanal <span style={{ color: 'var(--accent-gold)' }}>Philosophy</span></h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              We merge traditional techniques with contemporary design. Each piece in our collection is a testament to the enduring beauty of handcrafted goods, designed to be passed down through generations.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>01</div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>Ethical Sourcing</h4>
                  <p style={{ fontSize: '0.9rem', color: '#777' }}>Working only with certified ethical tanneries.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>02</div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>Slow Fashion</h4>
                  <p style={{ fontSize: '0.9rem', color: '#777' }}>Quality over quantity, built to last a lifetime.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
