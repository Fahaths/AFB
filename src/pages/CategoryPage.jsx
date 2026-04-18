import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/Home/ProductCard';
import { useGlobal } from '../context/GlobalContext';

const pageConfig = {
  bags: {
    title: 'Bags Collection',
    subtitle: 'Premium handcrafted bags for modern everyday style.'
  },
  footwear: {
    title: 'Footwear Collection',
    subtitle: 'Elegant footwear designed for comfort, quality, and statement looks.'
  }
};

const CategoryPage = ({ category }) => {
  const { products } = useGlobal();
  const categoryProducts = products.filter((product) => product.category === category);
  const config = pageConfig[category] || { title: 'Collection', subtitle: '' };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '120px', paddingBottom: '80px' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{config.title}</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto' }}>{config.subtitle}</p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="luxury-grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            No products are available in this category yet.
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default CategoryPage;
