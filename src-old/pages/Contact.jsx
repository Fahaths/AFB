import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Star, Send, ExternalLink } from 'lucide-react';
import '../styles/Contact.css';
import '../styles/GoogleReviews.css';

const Contact = () => {
  const whatsappNumber = "91XXXXXXXXXX"; // User to update
  const preFilledMessage = encodeURIComponent("Hi, I’m interested in your bags. Please share details.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${preFilledMessage}`;

  const reviews = [
    { id: 1, name: "Alexander Knight", rating: 5, text: "Excellent quality bags. The craftsmanship is truly premium. Highly recommended for bulk orders." },
    { id: 2, name: "Sophia Miller", rating: 5, text: "Professional support and very fast response. Their custom design team is top-notch!" },
    { id: 3, name: "Robert Wilson", rating: 5, text: "Handled our bulk order perfectly. The material quality exceeded our expectations." },
    { id: 4, name: "Emily Davis", rating: 4, text: "Very reliable bag manufacturer. Good communication and timely delivery." },
    { id: 5, name: "Daniel Chen", rating: 5, text: "The best custom bag manufacturer I've worked with. Attention to detail is amazing." },
    { id: 6, name: "Sarah Taylor", rating: 5, text: "Impressive response time on WhatsApp. Very helpful for quick enquiries." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="contact-page"
    >
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.h1 variants={itemVariants} className="hero-title">
            Let's Talk About Your <br/> Bag Requirements
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-sub">
            Bulk orders, custom designs, and quick support available. We help you create the perfect bags for your brand.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hero-wa-btn">
              <MessageCircle size={24} />
              Chat on WhatsApp
            </a>
            <p className="trust-line">Fast response within minutes</p>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'rgba(200, 155, 60, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(200, 155, 60, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
      </section>

      {/* Contact Options Grid */}
      <section className="container">
        <div className="contact-grid">
          <motion.div variants={itemVariants} className="contact-card">
            <div className="contact-icon-box"><Phone size={24} /></div>
            <h3>Call Us</h3>
            <p>+91 XXXXX XXXXX</p>
            <a href="tel:+91XXXXXXXXXX" style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '14px', marginTop: '10px', display: 'block' }}>CALL NOW</a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="contact-card">
            <div className="contact-icon-box"><Mail size={24} /></div>
            <h3>Email Us</h3>
            <p>support@alfahath.com</p>
            <a href="mailto:support@alfahath.com" style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '14px', marginTop: '10px', display: 'block' }}>SEND EMAIL</a>
          </motion.div>

          <motion.div variants={itemVariants} className="contact-card">
            <div className="contact-icon-box"><MapPin size={24} /></div>
            <h3>Visit Us</h3>
            <p>Luxury Industrial Estate, <br/> Mumbai, India</p>
            <a href="#map" style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '14px', marginTop: '10px', display: 'block' }}>GET DIRECTIONS</a>
          </motion.div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section id="map" className="form-map-section">
        <div className="container section-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="form-box"
          >
            <h2>Quick Enquiry</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="luxury-input-group">
                <input type="text" placeholder="Full Name" required className="luxury-input" />
              </div>
              <div className="luxury-input-group">
                <input type="text" placeholder="Phone / WhatsApp" required className="luxury-input" />
              </div>
              <div className="luxury-input-group">
                <textarea placeholder="Tell us about your requirements..." rows={4} required className="luxury-input" style={{ resize: 'none' }}></textarea>
              </div>
              <button className="submit-btn">Send Enquiry</button>
            </form>
            
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '15px' }}>Or get instant reply via</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#25D366', fontWeight: '800' }}>
                <MessageCircle size={20} /> START CHAT ON WHATSAPP
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="map-container"
          >
            <div className="location-tag">
              <MapPin size={16} color="var(--accent-gold)" /> Visit Our Location
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120612.44319451163!2d72.78443586328127!3d19.102660700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1713430000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="luxury-subtitle" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>What Our Customers Say</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#FFB800' }}>
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>4.9/5 Based on 200+ Reviews</span>
            </div>
          </div>

          <div className="google-reviews-grid">
            {reviews.map((rev, i) => (
              <motion.div 
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="google-review-card"
              >
                <div className="google-review-header">
                  <div className="google-reviewer-meta">
                    <h4>{rev.name}</h4>
                    <div className="google-stars">
                      {[...Array(rev.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${rev.name}`} className="google-avatar" alt="avatar" />
                </div>
                <p className="google-review-body">"{rev.text}"</p>
                <div className="google-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path d="M.01.01h24v24h-24z" fill="none"/></svg>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button className="btn-luxury-outline" style={{ color: 'var(--primary-navy)' }}>
              VIEW MORE REVIEWS ON GOOGLE <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Mobile WhatsApp */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="sticky-wa-mobile">
        <MessageCircle size={20} /> WhatsApp Us
      </a>
    </motion.div>
  );
};

export default Contact;
