import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '120px', minHeight: '80vh' }}
    >
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Contact Us</h1>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
            Get in touch with our team for exclusive requests and inquiries.
          </p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" placeholder="Your Name" style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
            <input type="email" placeholder="Your Email" style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
            <textarea placeholder="Your Message" rows="5" style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>
            <button className="btn-luxury" style={{ alignSelf: 'center' }}>Send Message</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
