import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      background: '#0B1F3A', 
      height: '65px', 
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.4s ease',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      boxShadow: 'var(--shadow-soft)'
    }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr auto 1fr', 
        alignItems: 'center', 
        width: '100%' 
      }}>
        {/* Left Side: Logo */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Link to="/" style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '1.25rem', 
            fontWeight: '700', 
            color: '#ffffff', 
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            AFB <span style={{ color: 'var(--accent-gold)' }}>LUXE</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ul style={{ display: 'flex', gap: '40px', margin: 0, padding: 0 }}>
            <li>
              <Link to="/" className="nav-link-luxury" style={{ 
                color: '#ffffff', 
                fontSize: '0.8rem', 
                fontWeight: '500', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                opacity: location.pathname === '/' ? 1 : 0.8
              }}>Home</Link>
            </li>
            <li>
              <Link to="/collection" className="nav-link-luxury" style={{ 
                color: '#ffffff', 
                fontSize: '0.8rem', 
                fontWeight: '500', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                opacity: location.pathname === '/collection' ? 1 : 0.8
              }}>Collection</Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link-luxury" style={{ 
                color: '#ffffff', 
                fontSize: '0.8rem', 
                fontWeight: '500', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                opacity: location.pathname === '/contact' ? 1 : 0.8
              }}>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Search Icon */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <button style={{ color: '#ffffff', cursor: 'pointer', transition: 'color 0.3s ease' }} 
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}
                  aria-label="Search">
            <Search size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
