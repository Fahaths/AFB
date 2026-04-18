import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ background: 'var(--primary-navy)', height: '70px', boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.4rem', 
          fontWeight: '700', 
          color: '#ffffff', 
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          AFB <span style={{ color: 'var(--accent-gold)' }}>LUXE</span>
        </Link>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <ul className="desktop-menu" style={{ display: 'flex', gap: '30px' }}>
            <li><Link to="/" style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Home</Link></li>
            <li><a href="/#collection" style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Collection</a></li>
            <li><a href="/#about" style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Philosophy</a></li>
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
