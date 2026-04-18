import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ShoppingBag, Footprints, Watch, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Collection.css';

const products = [
  // CATEGORY: BAGS
  { id: 1, name: "Classic Navy Tote", price: 249, oldPrice: 399, cent: "00", specs: "L × W × H", val: "35×15×28", rating: 4.8, category: "bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80" },
  { id: 2, name: "Urban Duffel Bag", price: 559, oldPrice: 699, cent: "00", specs: "Capacity", val: "45 Liters", rating: 4.9, category: "bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80" },
  { id: 3, name: "Azure Handbag", price: 289, oldPrice: 420, cent: "00", specs: "L × W × H", val: "25×10×20", rating: 4.7, category: "bags", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80" },
  { id: 4, name: "Midnight Clutch", price: 159, oldPrice: 280, cent: "00", specs: "Style", val: "Evening", rating: 4.8, category: "bags", image: "https://images.unsplash.com/photo-1566150905458-1bf1fd111c91?auto=format&fit=crop&q=80" },
  { id: 9, name: "Arctic Backpack", price: 195, oldPrice: 350, cent: "00", specs: "Material", val: "Canvas", rating: 4.5, category: "bags", image: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80" },
  { id: 10, name: "Sunset Satchel", price: 310, oldPrice: 480, cent: "00", specs: "Tone", val: "Vintage", rating: 4.9, category: "bags", image: "https://images.unsplash.com/photo-1598533340337-94cc8a2aa331?auto=format&fit=crop&q=80" },
  
  // CATEGORY: FOOTWEAR
  { id: 5, name: "Heritage Oxford", price: 320, oldPrice: 559, cent: "00", specs: "Size (UK)", val: "7 - 11", rating: 4.9, category: "footwear", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80" },
  { id: 6, name: "Leather Loafers", price: 280, oldPrice: 450, cent: "00", specs: "Finish", val: "Suede", rating: 4.7, category: "footwear", image: "https://images.unsplash.com/photo-1614252235316-8c807d929837?auto=format&fit=crop&q=80" },
  { id: 11, name: "Chelsea Boots", price: 420, oldPrice: 650, cent: "00", specs: "Elastic", val: "Webbed", rating: 4.8, category: "footwear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80" },
  { id: 12, name: "Grand Sneakers", price: 210, oldPrice: 350, cent: "00", specs: "Sole", val: "Rubber", rating: 4.6, category: "footwear", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80" },
  { id: 13, name: "Suede Derbies", price: 290, oldPrice: 460, cent: "00", specs: "Heel", val: "1.2 inch", rating: 4.7, category: "footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80" },
  { id: 14, name: "Wingtip Brogues", price: 340, oldPrice: 580, cent: "00", specs: "Pattern", val: "Full", rating: 4.9, category: "footwear", image: "https://images.unsplash.com/photo-1449241718242-233c4af9c850?auto=format&fit=crop&q=80" },
  
  // CATEGORY: ACCESSORIZE
  { id: 7, name: "Gold Chronograph", price: 850, oldPrice: 1250, cent: "00", specs: "Case", val: "42mm", rating: 4.9, category: "accessorize", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80" },
  { id: 8, name: "Silk Pocket Square", price: 45, oldPrice: 85, cent: "00", specs: "Fabric", val: "100% Silk", rating: 4.6, category: "accessorize", image: "https://images.unsplash.com/photo-1620783198644-77243c983d5a?auto=format&fit=crop&q=80" },
  { id: 15, name: "Leather Belt", price: 95, oldPrice: 160, cent: "00", specs: "Width", val: "3.5 cm", rating: 4.8, category: "accessorize", image: "https://images.unsplash.com/photo-1554990772-0bea55d510d5?auto=format&fit=crop&q=80" },
  { id: 16, name: "Wool Scarf", price: 120, oldPrice: 220, cent: "00", specs: "Length", val: "180 cm", rating: 4.7, category: "accessorize", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80" },
  { id: 17, name: "Silver Cufflinks", price: 180, oldPrice: 310, cent: "00", specs: "Metal", val: "925 Silver", rating: 4.9, category: "accessorize", image: "https://images.unsplash.com/photo-1603561391699-078a82ad1690?auto=format&fit=crop&q=80" }
];

const ITEMS_PER_PAGE = 12;

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleWhatsApp = (e, product) => {
    e.stopPropagation();
    const message = `Hello Al Fahath Bags! I'm interested in the ${product.name} priced at $${product.price}. Could you share more details?`;
    const waUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="collection-page"
    >
      <div className="container">
        <div className="collection-banner">
          <div className="banner-content">
            <h1>Your bag, your style<br /><span style={{ padding: '0px' }}>WhatsApp us now</span></h1>
            <button className="btn-vist">Visit Shop</button>
          </div>
        </div>

        <div className="filter-bar" style={{ justifyContent: 'center', marginBottom: '60px' }}>
          <div className="filter-groups" style={{ gap: '20px' }}>
            {['all', 'bags', 'footwear', 'accessorize'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                style={{
                  background: activeCategory === cat ? 'var(--primary-navy)' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#1a1a1a',
                  padding: '12px 28px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: activeCategory === cat ? 'none' : 'var(--shadow-soft)',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat === 'all' && "All Items"}
                {cat === 'bags' && <><ShoppingBag size={18} /> Bags</>}
                {cat === 'footwear' && <><Footprints size={18} /> Footwear</>}
                {cat === 'accessorize' && <><Watch size={18} /> Accessorize</>}
              </button>
            ))}
          </div>
        </div>

        <h2 className="collection-title" style={{ fontSize: '32px', textAlign: 'left', marginBottom: '40px' }}>
          {activeCategory === 'all' ? 'Every Luxury' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} <span style={{ color: 'var(--accent-gold)' }}>For You!</span>
        </h2>

        <div className="collection-grid">
          <AnimatePresence mode="popLayout">
            {currentItems.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="col-product-card" 
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-img-container">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="card-controls" style={{ padding: '0 5px' }}>
                  <div className="control-item">
                    <span className="control-spec">{product.specs}</span>
                    <span className="control-val">{product.val}</span>
                  </div>
                  
                  <div className="rating-box">
                    <Star size={14} fill="#FFB800" color="#FFB800" />
                    <span className="control-val" style={{ marginTop: '0' }}>{product.rating}</span>
                  </div>

                  <button className="wishlist-btn-new" onClick={(e) => e.stopPropagation()}>
                    <Heart size={16} />
                  </button>

                  <button className="whatsapp-btn-card" onClick={(e) => handleWhatsApp(e, product)}>
                    <div className="whatsapp-icon-animated">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                  </button>
                </div>

                <div className="card-details">
                  <div className="card-title-group">
                    <span className="brand-text">{product.category}</span>
                    <h3 className="product-name-bold">{product.name}</h3>
                  </div>
                  <div className="price-group-new">
                    <span className="new-price-card">
                      <span>$</span>{product.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '80px', marginBottom: '100px' }}>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i}
                onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                style={{
                  width: '50px', height: '50px', borderRadius: '50%', border: 'none',
                  background: currentPage === i + 1 ? 'var(--primary-navy)' : '#fff',
                  color: currentPage === i + 1 ? '#fff' : '#666',
                  fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: 'var(--shadow-soft)', transition: 'all 0.3s ease'
                }}
              >
                {i + 1}
              </button>
            ))}
            {currentPage < totalPages && (
              <button 
                onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                style={{
                  width: '50px', height: '50px', borderRadius: '50%', border: '1px solid #0b1f3a66',
                  background: '#fff', color: '#0b1f3a', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-soft)'
                }}
              >
                <ChevronDown size={20} style={{ transform: 'rotate(-90deg)' }} />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Collection;
