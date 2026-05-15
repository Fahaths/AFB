'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const socialIcons = [
    { 
      name: 'Instagram', 
      url: '#',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      url: '#',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      url: '#',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      )
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#03152B] via-[#071B34] to-[#0A2342] text-white pt-[80px] pb-[30px] px-[7%] border-t border-white/5 overflow-hidden">
      
      {/* Luxury Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C89B3C]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr] gap-y-[50px] lg:gap-x-[100px]">
          
          {/* Brand Section */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-white text-[42px] font-black tracking-[-1px] uppercase font-serif leading-none block"
              >
                AFB <span className="text-[#C89B3C]">LUXE</span>
              </motion.span>
            </Link>
            
            <p className="text-[rgba(255,255,255,0.72)] text-[17px] leading-[1.8] max-w-[340px] font-medium">
              Handcrafted for the discerning individual. We blend traditional craftsmanship with contemporary luxury to create pieces that tell a story of global heritage.
            </p>

            <div className="flex gap-[14px]">
              {socialIcons.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  whileHover={{ y: -6, backgroundColor: '#C89B3C', color: '#071B34', boxShadow: '0 10px 25px rgba(200,155,60,0.3)' }}
                  className="w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center transition-all duration-300 text-white/60"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-8">
            <h3 className="text-[#C89B3C] text-[12px] font-black uppercase tracking-[3px]">Navigation</h3>
            <nav className="flex flex-col gap-[18px]">
              {[
                { name: 'Home', url: '/' },
                { name: 'The Archive', url: '/collection' },
                { name: 'Our Story', url: '/about' },
                { name: 'Contact', url: '/contact' }
              ].map((link) => (
                <Link key={link.name} href={link.url} className="group flex items-center gap-2">
                  <motion.span 
                    whileHover={{ x: 8 }}
                    className="text-[16px] font-medium text-white/60 group-hover:text-[#C89B3C] transition-all duration-300"
                  >
                    {link.name}
                  </motion.span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-[#C89B3C]" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-8">
            <h3 className="text-[#C89B3C] text-[12px] font-black uppercase tracking-[3px]">Inquiries</h3>
            <div className="flex flex-col gap-5">
              {[
                { icon: <MapPin size={18} />, text: 'Elite District, Suite 402, Global Fashion Hub, IN 600001' },
                { icon: <Phone size={18} />, text: '+91 98400 31124' },
                { icon: <Mail size={18} />, text: 'concierge@afbluxe.com' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-[18px] p-4 flex items-center gap-4 group hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300"
                >
                  <div className="w-[42px] h-[42px] rounded-full bg-[rgba(200,155,60,0.12)] text-[#C89B3C] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[15px] leading-[1.7] text-white/70 group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-[60px] mb-[30px] h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-[10px]">
          <p className="text-[11px] font-black uppercase tracking-[2px] opacity-[0.45]">
            © 2026 Al Fahath Luxe. Crafted for Legacy.
          </p>
          <div className="flex gap-[40px] text-[11px] font-black uppercase tracking-[2px] opacity-[0.45]">
            <Link href="#" className="hover:text-[#C89B3C] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#C89B3C] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#C89B3C] transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
