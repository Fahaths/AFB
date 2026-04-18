import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="product-card-luxury"
    >
      <Link to={`/product/${product.id}`}>
        <div className="img-container">
          <img src={product.image} alt={product.name} />
        </div>
      </Link>

      <div style={{ padding: '24px', textAlign: 'center' }}>
        <p style={{ 
          fontSize: '0.75rem', 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          color: 'var(--accent-gold)', 
          fontWeight: '600',
          marginBottom: '8px'
        }}>
          Handcrafted
        </p>
        <h3 style={{ 
          fontSize: '1.2rem', 
          marginBottom: '12px', 
          fontFamily: 'var(--font-heading)',
          color: 'var(--primary-navy)'
        }}>
          {product.name}
        </h3>
        <p style={{ 
          fontSize: '1rem', 
          fontWeight: '500', 
          color: 'var(--text-main)',
          marginBottom: '20px'
        }}>
          ${product.price}
        </p>
        <Link to={`/product/${product.id}`} className="btn-outline-luxury" style={{ padding: '8px 24px', fontSize: '0.8rem', width: '100%', justifyContent: 'center' }}>
          Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
