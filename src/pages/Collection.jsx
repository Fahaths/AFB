import React from 'react';
import { motion } from 'framer-motion';

const Collection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '120px', minHeight: '80vh' }}
    >
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Full Collection</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Explore our complete range of premium luxury goods.</p>
        
        {/* Placeholder for collection grid */}
        <div style={{ marginTop: '60px', padding: '100px', background: '#f9f9f9', borderRadius: '12px', textAlign: 'center' }}>
          Collection Display Coming Soon
        </div>
      </div>
    </motion.div>
  );
};

export default Collection;
