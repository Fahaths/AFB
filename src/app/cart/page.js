'use client';

import Navbar from '@/components/Common/Navbar';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, mounted } = useCart();

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F4]">
      <Loader2 className="animate-spin text-accent-gold" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F6F4]">
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-primary-navy font-serif tracking-tight">Your Selection</h1>
          <p className="text-gray-400 mt-2 font-medium">Review your items before proceeding to the vault.</p>
        </header>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-serif text-gray-400 mb-8 italic">Your bag is currently empty.</h2>
            <Link 
              href="/collection" 
              className="bg-primary-navy text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all"
            >
              Browse Collection <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group"
                  >
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-primary-navy font-serif">{item.name}</h3>
                          <span className="text-[10px] text-accent-gold font-black uppercase tracking-widest">{item.category}</span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-2xl">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:text-primary-navy transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-primary-navy w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:text-primary-navy transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-xl font-black text-primary-navy tracking-tighter">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-primary-navy p-10 rounded-[40px] text-white shadow-2xl shadow-navy-200 sticky top-32">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-8 text-accent-gold">Summary</h2>
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between text-white/60 text-sm font-medium">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-sm font-medium">
                    <span>Shipping</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold uppercase tracking-widest text-xs">Total</span>
                    <span className="text-3xl font-black tracking-tighter">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-accent-gold text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#b08935] transition-all"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
                
                <p className="text-[10px] text-white/30 text-center mt-6 font-medium leading-relaxed uppercase tracking-widest">
                  Secure checkout handled by Al Fahath global network
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
