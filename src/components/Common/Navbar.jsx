'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, LayoutGrid, ShoppingBag, Footprints, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-');

  const navigationData = [
    {
      label: 'Bags',
      icon: <ShoppingBag size={14} />,
      items: ['Schoolbags', 'College Bags', 'Travel Bags', 'Handbags']
    },
    {
      label: 'Footwear',
      icon: <Footprints size={14} />,
      items: ['Formal', 'Casual', 'Sports', 'Sandals', 'Slippers']
    },
    {
      label: 'Accessories',
      icon: <Sparkles size={14} />,
      items: ['Watches', 'Belts', 'Shoe Polish']
    }
  ];

  if (!mounted) return <div className="fixed top-0 left-0 w-full h-16 bg-[#061426] z-50"></div>;

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#061426] z-50 px-8 flex items-center justify-between shadow-sm border-b border-white/5">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center">
        <span className="text-white text-xl font-bold tracking-tight uppercase">
          AFB <span className="text-accent-gold ml-1">LUXE</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-12">
        <Link
          href="/"
          className="text-white hover:text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
        >
          Home
        </Link>
        
        {/* Multi-Level Collection Dropdown */}
        <div className="relative group/main h-16 flex items-center">
          <Link
            href="/collection"
            className="flex items-center gap-2 text-white group-hover/main:text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            Collection <ChevronRight size={12} className="rotate-90 text-white/40 group-hover/main:text-accent-gold transition-transform" />
          </Link>

          {/* First Level: Categories */}
          <div className="absolute top-full left-0 w-56 bg-[#061426] border border-white/5 rounded-b-2xl shadow-2xl py-2 opacity-0 invisible translate-y-2 group-hover/main:opacity-100 group-hover/main:visible group-hover/main:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] z-[60]">
            {navigationData.map((cat) => (
              <div key={cat.label} className="relative group/sub">
                <Link
                  href={`/collection/${slugify(cat.label)}`}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all group-hover/sub:bg-white/5 group-hover/sub:text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-accent-gold/40 group-hover/sub:text-accent-gold transition-colors">{cat.icon}</span>
                    {cat.label}
                  </div>
                  <ChevronRight size={14} className="text-white/20 group-hover/sub:text-accent-gold" />
                </Link>

                {/* Second Level: Types (Sideways) */}
                <div className="absolute top-0 left-full w-56 bg-[#061426] border border-white/5 rounded-xl shadow-2xl py-2 ml-px opacity-0 invisible translate-x-2 group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] z-[70]">
                  {cat.items.map((item) => (
                    <Link
                      key={item}
                      href={`/collection/${slugify(cat.label)}/${slugify(item)}`}
                      className="w-full flex items-center justify-between px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 group/item transition-all"
                    >
                      {item}
                      <div className="w-1 h-1 rounded-full bg-accent-gold scale-0 group-hover/item:scale-100 transition-transform duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mx-5 my-2 border-t border-white/5 pt-2">
              <Link
                href="/collection"
                className="flex items-center gap-3 px-0 py-2.5 text-[10px] font-black uppercase tracking-widest text-accent-gold hover:text-white transition-colors"
              >
                <LayoutGrid size={14} />
                View Full Catalog
              </Link>
            </div>
          </div>
        </div>

        <Link
          href="/contact"
          className="text-white hover:text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
        >
          Contact
        </Link>
      </div>

      {/* Action Icons */}
      <div className="flex items-center">
        <Link 
          href="/collection?search=focus" 
          className="text-white hover:text-accent-gold transition-all p-2"
        >
          <Search size={18} strokeWidth={2.5} />
        </Link>
      </div>
    </nav>
  );
}
