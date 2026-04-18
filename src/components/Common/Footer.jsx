import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--primary-navy)', color: 'var(--white)', padding: '80px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', marginBottom: '50px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1.5rem', letterSpacing: '2px' }}>AFB LUXE</h3>
            <p style={{ color: '#a0a0a0', marginBottom: '25px', maxWidth: '300px' }}>
              Handcrafted premium bags and footwear designed for elegance and durability.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{ color: 'var(--accent-gold)' }}><Instagram size={20} /></a>
              <a href="#" style={{ color: 'var(--accent-gold)' }}><Facebook size={20} /></a>
              <a href="#" style={{ color: 'var(--accent-gold)' }}><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--white)', marginBottom: '25px', position: 'relative' }}>
              Quick Links
              <span style={{ content: '""', position: 'absolute', left: 0, bottom: '-8px', width: '30px', height: '2px', backgroundColor: 'var(--accent-gold)' }}></span>
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li><Link to="/" style={{ color: '#a0a0a0' }}>Home</Link></li>
              <li><Link to="/bags" style={{ color: '#a0a0a0' }}>Bags</Link></li>
              <li><Link to="/footwear" style={{ color: '#a0a0a0' }}>Footwear</Link></li>
              <li><Link to="/about-us" style={{ color: '#a0a0a0' }}>About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--white)', marginBottom: '25px', position: 'relative' }}>
              Contact Us
              <span style={{ content: '""', position: 'absolute', left: 0, bottom: '-8px', width: '30px', height: '2px', backgroundColor: 'var(--accent-gold)' }}></span>
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#a0a0a0' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MapPin size={18} color="var(--accent-gold)" />
                <span>123 Luxury Street, Fashion City</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="var(--accent-gold)" />
                <span>+1 234 567 8900</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} color="var(--accent-gold)" />
                <span>info@afbcollection.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} AFB Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
