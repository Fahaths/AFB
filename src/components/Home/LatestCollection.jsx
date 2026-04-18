import React from "react";
import { motion } from "framer-motion";
import "./LatestCollection.css";

const products = [
  {
    id: 1,
    name: "Urban Travel Bag",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
  },
  {
    id: 2,
    name: "Classic Tote",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  },
  {
    id: 3,
    name: "Premium Carry Bag",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
  },
];

const LatestCollection = () => {
  return (
    <section className="latest-section">
      <div className="container">
        
        <div className="latest-header">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Latest <span>Collection</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover premium bags crafted for style, durability, and everyday
            excellence.
          </motion.p>
        </div>

        <div className="latest-grid">
          {products.map((item, index) => (
            <motion.div 
              className="latest-card" 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img src={item.image} alt={item.name} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestCollection;
