'use client';

import { useState } from 'react';
import Navbar from '@/components/Common/Navbar';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cartTotal, cartCount, clearCart, mounted } = useCart();
  const [complete, setComplete] = useState(false);

  if (!mounted) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setComplete(true);
    clearCart();
    toast.success('Order Placed Successfully!', {
      duration: 5000,
      icon: '🎉',
      style: { borderRadius: '20px', background: '#0B1F3A', color: '#fff' }
    });
  };

  if (complete) {
    return (
      <div className="min-h-screen bg-[#F8F6F4] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-16 rounded-[50px] shadow-sm border border-gray-100 max-w-xl"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-black text-primary-navy font-serif mb-4 tracking-tight">Your order is secured.</h1>
          <p className="text-gray-400 font-medium mb-10 leading-relaxed">
            Thank you for choosing Al Fahath. Our concierge team is now processing your request and will contact you shortly with your tracking details.
          </p>
          <Link href="/" className="bg-primary-navy text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 hover:scale-105 transition-all">
            Return to Storefront <ChevronRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F4]">
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form */}
          <div className="space-y-12">
            <header>
              <h1 className="text-4xl font-black text-primary-navy font-serif tracking-tight">Finalize Order</h1>
              <p className="text-gray-400 mt-2 font-medium">Verify your shipping and secure payment details.</p>
            </header>

            <form onSubmit={handlePlaceOrder} className="space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Truck size={18} className="text-accent-gold" />
                  <h2 className="text-xs font-black uppercase tracking-widest text-primary-navy">Shipping Details</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="First Name" className="col-span-1 bg-white px-6 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-accent-gold/20 font-medium text-sm" />
                  <input required placeholder="Last Name" className="col-span-1 bg-white px-6 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-accent-gold/20 font-medium text-sm" />
                  <input required placeholder="Shipping Address" className="col-span-2 bg-white px-6 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-accent-gold/20 font-medium text-sm" />
                  <input required placeholder="City / State" className="col-span-1 bg-white px-6 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-accent-gold/20 font-medium text-sm" />
                  <input required placeholder="Postal Code" className="col-span-1 bg-white px-6 py-4 rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-accent-gold/20 font-medium text-sm" />
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={18} className="text-accent-gold" />
                  <h2 className="text-xs font-black uppercase tracking-widest text-primary-navy">Secure Billing</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 bg-white p-6 rounded-2xl border border-accent-gold/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={100} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-gold mb-4">Payment Method</p>
                    <p className="text-sm font-bold text-primary-navy mb-1">Electronic Transfer / Card on Delivery</p>
                    <p className="text-xs text-gray-400">Secured via Al Fahath International Billing</p>
                  </div>
                </div>
              </section>

              <button 
                type="submit"
                className="w-full bg-primary-navy text-white py-6 rounded-[32px] font-black text-xl hover:bg-[#061426] transition-all shadow-2xl shadow-navy-100 flex items-center justify-center gap-4"
              >
                Complete Reservation <ChevronRight size={24} />
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:pt-20">
            <div className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm sticky top-32">
              <div className="flex justify-between items-center mb-10 pb-8 border-b border-gray-50">
                <h3 className="text-xl font-bold font-serif text-primary-navy italic">Summary</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-gold">{cartCount} Items</span>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-sm font-medium text-gray-400 uppercase tracking-widest">
                  <span>Vault Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-accent-gold">Complimentary</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-12">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary-navy">Grand Total</span>
                <span className="text-5xl font-black text-primary-navy tracking-tighter">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent-gold shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-navy">Encrypted Checkout</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Your data is protected by global standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
