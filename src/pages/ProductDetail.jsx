import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGlobal } from '../context/GlobalContext';
import { ChevronLeft, MessageCircle } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useGlobal();

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Product not found.</div>;
  }

  const whatsappNumber = '1234567890';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I am interested in the ${product.name}.`)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-luxury)' }}
    >
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}
        >
          <ChevronLeft size={18} /> BACK TO COLLECTION
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', boxShadow: 'var(--shadow-subtle)' }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', borderRadius: '2px', display: 'block' }} 
              />
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>
              Handcrafted Accessory
            </span>
            <h1 style={{ fontSize: '3rem', margin: '15px 0 20px', lineHeight: '1.2' }}>{product.name}</h1>
            <p style={{ fontSize: '1.8rem', color: 'var(--primary-navy)', fontWeight: '500', marginBottom: '40px' }}>${product.price}</p>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '40px', maxWidth: '500px' }}>
              {product.description || "The quintessential luxury bag, meticulously crafted for those who demand excellence. Every stitch tells a story of heritage and artisanal mastery."}
            </p>

            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '30px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-navy)' }}>Material</span>
                  <span style={{ color: '#777' }}>Full-grain Italian Leather</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-navy)' }}>Hardware</span>
                  <span style={{ color: '#777' }}>Polished Brass</span>
                </div>
              </div>
            </div>

            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-luxury"
              style={{ width: '100%', padding: '18px', justifyContent: 'center', fontSize: '1rem' }}
            >
              <MessageCircle size={22} /> ENQUIRE ON WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
