'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Send, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#061426] text-white py-20 px-6 md:px-12 lg:px-24 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 text-left">
        
        {/* Column 1: Brand */}
        <div className="space-y-8">
          <h2 className="text-accent-gold text-2xl font-black font-serif tracking-wider">AFB LUXE</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
            Handcrafted premium bags designed for elegance and durability. Elevate your style with our exclusive collection.
          </p>
          <div className="flex gap-6 text-accent-gold">
            <Link href="#" className="hover:text-white transition-colors"><Globe size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><Share2 size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><Send size={20} /></Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-white text-xl font-bold font-serif italic tracking-tight">Quick Links</h3>
            <div className="w-10 h-[2px] bg-accent-gold"></div>
          </div>
          <nav className="flex flex-col gap-4 text-gray-400 text-sm md:text-base font-medium">
            <Link href="/" className="hover:text-accent-gold transition-colors">Home</Link>
            <Link href="/collection" className="hover:text-accent-gold transition-colors">New Collection</Link>
            <Link href="/about" className="hover:text-accent-gold transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-accent-gold transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Column 3: Contact */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-white text-xl font-bold font-serif italic tracking-tight">Contact Us</h3>
            <div className="w-10 h-[2px] bg-accent-gold"></div>
          </div>
          <div className="flex flex-col gap-6 text-gray-400 text-sm md:text-base font-medium">
            <div className="flex items-center gap-4">
              <MapPin size={18} className="text-accent-gold flex-shrink-0" />
              <span>123 Luxury Street, Fashion City</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={18} className="text-accent-gold flex-shrink-0" />
              <span>+1 234 567 8900</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={18} className="text-accent-gold flex-shrink-0" />
              <span>info@afbcollection.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 text-center">
        <p className="text-gray-500 text-xs md:text-sm font-medium tracking-wide">
          © 2026 AFB Collection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
