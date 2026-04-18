import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="product-card-luxury"
    >
      <Link to={`/product/${product.id}`}>
        <div className="img-container">
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
      </Link>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          marginBottom: '8px', 
          fontFamily: 'var(--font-heading)',
          color: 'var(--primary-navy)'
        }}>
          {product.name}
        </h3>
        <p style={{ 
          fontSize: '0.95rem', 
          fontWeight: '500', 
          color: 'var(--accent-gold)',
          marginBottom: '16px'
        }}>
          ${product.price}
        </p>
        <Link to={`/product/${product.id}`} className="btn-outline-luxury" style={{ width: '100%', justifyContent: 'center' }}>
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
