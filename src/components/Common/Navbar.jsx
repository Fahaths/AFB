'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { mounted } = useCart();

  if (!mounted) return <div className="fixed top-0 left-0 w-full h-16 bg-[#061426] z-50"></div>;

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#061426] z-50 px-8 flex items-center justify-between shadow-sm">
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
        <Link
          href="/collection"
          className="text-white hover:text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
        >
          Collection
        </Link>
        <Link
          href="/contact"
          className="text-white hover:text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
        >
          Contact
        </Link>
      </div>

      {/* Action Icons */}
      <div className="flex items-center">
        <button className="text-white hover:text-accent-gold transition-all p-2">
          <Search size={18} strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}
