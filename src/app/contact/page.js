'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import ClientReflections from '@/components/Review/ClientReflections';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const socialPlatforms = [
    { 
      name: 'WhatsApp', 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      url: 'https://wa.me/919840031124',
      label: 'Chat on WhatsApp'
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ), 
      url: 'https://instagram.com', 
      label: 'Follow our Archive' 
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ), 
      url: 'https://facebook.com', 
      label: 'Join our Community' 
    }
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setFormSubmitted(true);
      setFormData({ name: '', message: '' });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] overflow-x-hidden pt-[140px]">
      
      {/* Minimal Intro Header (35vh) */}
      <header className="relative h-[35vh] w-full flex flex-col justify-center px-8 lg:px-[10%] pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl"
        >
          <span className="text-[#071B34] font-black uppercase tracking-[0.5em] text-[10px] block mb-6">Contact</span>
          <h1 className="text-[clamp(48px,6vw,78px)] font-bold text-[#071B34] font-serif leading-[1.05] mb-8 tracking-tighter">
            Let’s Start a <br /> <span className="italic font-normal">Conversation.</span>
          </h1>
          <p className="text-[#6B7280] text-lg md:text-[18px] font-medium tracking-wide leading-[1.8] max-w-[520px]">
            Reach out for enquiries, collaborations, or to discover the latest from Al Fahath.
          </p>
        </motion.div>
      </header>

      {/* Social Connect Section */}
      <section className="py-20 px-8 lg:px-[10%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialPlatforms.map((platform, idx) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              whileHover={{ y: -6, shadow: "0 20px 40px rgba(0,0,0,0.05)" }}
              className="bg-white p-10 rounded-[24px] border border-[#071B34]/5 flex flex-col items-center text-center transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#071B34]/5 flex items-center justify-center text-[#071B34] mb-6 group-hover:bg-[#C89B3C] group-hover:text-white transition-all duration-500">
                {platform.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-[#071B34] mb-2">{platform.name}</h3>
              <p className="text-[#7A7A7A] text-[10px] font-black uppercase tracking-widest">{platform.label}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form Section (Split Layout) */}
      <section className="py-32 px-8 lg:px-[10%] bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className="relative">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-[#C89B3C] font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Send an Enquiry</span>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#7A7A7A] px-1">Your Name</label>
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter full name"
                        className="w-full bg-[#F7F3EE] border-none rounded-[14px] p-5 text-sm font-medium focus:ring-2 focus:ring-[#C89B3C]/20 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#7A7A7A] px-1">Message</label>
                      <textarea 
                        required
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="How can we assist you?"
                        className="w-full bg-[#F7F3EE] border-none rounded-[14px] p-5 text-sm font-medium focus:ring-2 focus:ring-[#C89B3C]/20 transition-all outline-none resize-none"
                      />
                    </div>
                    {errorMsg && (
                      <p className="text-red-500 text-xs font-bold text-center mt-2">{errorMsg}</p>
                    )}
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#071B34] text-white py-5 rounded-[14px] font-black uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-4 transition-all hover:bg-[#C89B3C] hover:-translate-y-1 shadow-xl shadow-[#071B34]/10 disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send size={16} />}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 bg-[#F7F3EE] rounded-[40px] border border-[#C89B3C]/20"
                >
                  <div className="w-20 h-20 bg-[#C89B3C] rounded-full flex items-center justify-center mx-auto mb-8 text-white">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-[#071B34] mb-4">Thank You.</h2>
                  <p className="text-[#7A7A7A] font-medium max-w-sm mx-auto">Your message has been received. Our concierge team will connect with you shortly.</p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-10 text-[#C89B3C] font-black uppercase tracking-[0.3em] text-[10px] underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Contact Editorial" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B34]/40 to-transparent"></div>
            </div>
            {/* Editorial Quote Block */}
            <div className="absolute -bottom-10 -right-10 bg-[#C89B3C] p-10 rounded-[40px] shadow-2xl max-w-xs">
               <p className="text-[#071B34] font-serif italic text-2xl leading-relaxed">
                 "Excellence is not an act, but a habit of conversation."
               </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-20 px-8 lg:px-[10%]">
        <div className="max-w-[1280px] mx-auto">
          <div className="rounded-[40px] overflow-hidden h-[500px] shadow-2xl border border-white/10 relative">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5332156826!2d80.2443003!3d13.0653003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52661000000000%3A0x0!2zMTPCsDAzJzU1LjEiTiA4MMKwMTQnNDAuNiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md p-8 rounded-[32px] border border-black/5 shadow-xl">
                 <h4 className="text-[#071B34] font-serif font-bold text-xl mb-4">Visit the Atelier</h4>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-[#7A7A7A]">
                       <MapPin size={16} className="text-[#C89B3C]" />
                       <span>Elite District, Global Fashion Hub</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#7A7A7A]">
                       <Phone size={16} className="text-[#C89B3C]" />
                       <span>+91 98400 31124</span>
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </section>

      <ClientReflections />
    </div>
  );
}
