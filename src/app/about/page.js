'use client';

import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
  };

  const timelineEvents = [
    { year: "2026", title: "The Beginning", desc: "A vision for substance over shadow." },
    { year: "2027", title: "Shaping the Vision", desc: "Defining the silhouettes of contemporary utility." },
    { year: "Future", title: "Building a Legacy", desc: "Craftsmanship that endures generations." }
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EE] overflow-x-hidden pt-[80px]">
      
      {/* Minimal Editorial Intro (40vh) */}
      <header className="relative min-h-[40vh] w-full flex flex-col justify-center px-8 lg:px-[10%] pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-[700px]"
        >
          <span className="text-[#071B34] font-black uppercase tracking-[0.5em] text-[10px] block mb-6">Our Story</span>
          <h1 className="text-[clamp(48px,6vw,80px)] font-bold text-[#071B34] font-serif leading-[1.05] mb-10 tracking-tighter">
            Crafted through vision, <br />
            built with <span className="italic font-normal">purpose.</span>
          </h1>
          <p className="text-[#6B7280] text-lg md:text-[18px] font-medium tracking-wide leading-[1.8] max-w-[520px]">
            Al Fahath is more than a collection. It is a reflection of identity, craftsmanship, and timeless elegance.
          </p>
        </motion.div>
      </header>

      {/* Brand Journey Section - Alternating Layout */}
      <section className="py-40 px-8 lg:px-[10%] bg-white">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-40">
          
          {/* Block 1: Text Left + Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="max-w-md">
              <span className="text-[#C89B3C] font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">The Genesis</span>
              <h2 className="text-4xl font-serif text-[#071B34] mb-8">A New Standard</h2>
              <p className="text-[#7A7A7A] leading-relaxed text-lg">
                The journey began with a simple question: How do we create pieces that transcend the noise of fast fashion? Our answer was a return to the essentials of design and the integrity of materials.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Journey 1" />
            </motion.div>
          </div>

          {/* Block 2: Image Left + Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="order-2 lg:order-1 aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1594913785162-e67860bd259e?q=80&w=1931&auto=format&fit=crop" className="w-full h-full object-cover" alt="Journey 2" />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="order-1 lg:order-2 max-w-md ml-auto">
              <span className="text-[#C89B3C] font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">The Vision</span>
              <h2 className="text-4xl font-serif text-[#071B34] mb-8">A Silent Luxury</h2>
              <p className="text-[#7A7A7A] leading-relaxed text-lg">
                We believe in the power of the understated. Our aesthetic is a dialogue between shadow and light, form and function—curated for those who find elegance in the details others overlook.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Philosophy (50/50 Split) */}
      <section className="py-40 px-8 lg:px-[10%] bg-[#F7F3EE]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeInUp}>
            <span className="text-[#C89B3C] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Our Craft</span>
            <h2 className="text-5xl md:text-7xl font-bold text-[#071B34] font-serif mb-10 leading-tight">
              Crafted with <br /> <span className="italic font-normal">Precision.</span>
            </h2>
            <p className="text-[#7A7A7A] text-xl leading-relaxed max-w-[500px]">
              Every detail reflects a commitment to modern craftsmanship, refined materials, and timeless design. From the selection of Italian leathers to the final hand-stitch, the process is intentional.
            </p>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="relative aspect-square lg:aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1558231580-043c7b396901?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="Craftsmanship Close-up" 
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>
        </div>
      </section>

      {/* Visual Storytelling (Asymmetrical Editorial Grid) */}
      <section className="py-40 px-8 lg:px-[10%] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[800px]">
            <motion.div {...fadeInUp} className="md:col-span-7 relative rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Atmosphere 1" />
            </motion.div>
            <div className="md:col-span-5 flex flex-col gap-8">
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="flex-1 relative rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Atmosphere 2" />
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="flex-1 relative rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1511405946472-a37e3b5ccd47?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" alt="Atmosphere 3" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Timeline (Minimal Luxury) */}
      <section className="py-40 px-8 bg-[#F7F3EE]">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-[#C89B3C] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Archive</span>
            <h2 className="text-4xl font-serif text-[#071B34]">The Evolution</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {timelineEvents.map((event, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.2 }}
                className="text-center"
              >
                <span className="text-[#C89B3C] font-serif text-5xl mb-6 block opacity-30">{event.year}</span>
                <h3 className="text-xl font-serif font-bold text-[#071B34] mb-4">{event.title}</h3>
                <p className="text-[#7A7A7A] text-sm leading-relaxed max-w-[240px] mx-auto">{event.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Vision (Centered Editorial Quote) */}
      <section className="py-60 px-8 text-center bg-white">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-[#071B34] leading-[1.2] italic">
            "Luxury is not excess. <br /> It is refinement with purpose."
          </h2>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-px h-16 bg-[#C89B3C] mb-6"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7A7A7A]">Al Fahath // Creative Vision</p>
          </div>
        </motion.div>
      </section>

      {/* Minimal Closing Statement */}
      <section className="py-40 px-8 bg-[#071B34] text-white text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">More than fashion. <br /> A legacy carried forward.</h2>
          <div className="mt-12">
            <div className="w-12 h-px bg-[#C89B3C] mx-auto"></div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
