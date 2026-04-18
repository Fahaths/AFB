import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const linkStyle = {
  color: '#ffffff',
  fontSize: '0.85rem',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const Navbar = () => {
  return (
    <nav className="navbar" style={{ background: 'var(--primary-navy)', height: '70px', boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}
        >
          AFB <span style={{ color: 'var(--accent-gold)' }}>LUXE</span>
        </Link>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <ul className="desktop-menu" style={{ display: 'flex', gap: '22px' }}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/bags" style={linkStyle}>Bags</Link></li>
            <li><Link to="/footwear" style={linkStyle}>Footwear</Link></li>
            <li><Link to="/about-us" style={linkStyle}>About Us</Link></li>
          </ul>
          <Link to="/admin" style={{ color: 'var(--accent-gold)' }} title="Admin Panel">
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
