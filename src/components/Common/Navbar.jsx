'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collection', href: '/collection' },
    { label: 'Our Story', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-[80px] z-[1000] transition-all duration-500 ${
          scrolled 
            ? 'bg-[#071B34]/95 backdrop-blur-md shadow-2xl' 
            : 'bg-[#071B34]/92 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1280px] h-full mx-auto px-8 flex items-center justify-between">
          
          {/* Logo - Left */}
          <Link href="/" className="flex items-center group relative z-10">
            <img 
              src="/logo.png" 
              alt="Al Fahath Bags & Footwears Logo" 
              className="h-[54px] md:h-[62px] w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </Link>

          {/* Navigation - Center */}
          <div className="hidden lg:flex items-center gap-[40px] absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-[11px] font-black uppercase tracking-[3px] font-sans transition-all duration-300 group ${
                  pathname === link.href ? 'text-[#C89B3C]' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-[#C89B3C] transition-all duration-500 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Action Icons - Right */}
          <div className="flex items-center gap-[24px] relative z-10">
            <Link href="/collection" className="text-white/70 hover:text-[#C89B3C] transition-all hidden sm:block">
              <Search size={20} strokeWidth={2} />
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white/70 hover:text-white transition-all ml-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-[#071B34] z-[2000] lg:hidden flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <img 
                src="/logo.png" 
                alt="Al Fahath Bags & Footwears Logo" 
                className="h-[48px] w-auto object-contain" 
              />
              <button onClick={() => setMobileMenuOpen(false)} className="text-white"><X size={28} /></button>
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black text-white/30 hover:text-[#C89B3C] font-serif transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
