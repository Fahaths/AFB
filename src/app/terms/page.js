import Navbar from '@/components/Common/Navbar';
import Link from 'next/link';

export const metadata = {
  title: "Terms of Service | Al Fahath Bags & Footwears",
  description: "Read the official terms governing the use of the Al Fahath Bags & Footwears digital experience.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#071B34] font-sans pb-32">
      <Navbar />
      
      <main className="max-w-[800px] mx-auto px-6 pt-40 md:pt-48">
        {/* Header section */}
        <header className="mb-20 text-center md:text-left">
          <span className="text-[#C89B3C] font-black uppercase tracking-[0.5em] text-[10px] block mb-4">Atelier Legal</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight mb-6">Terms of Service</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Last Updated: May 18, 2026</p>
        </header>

        {/* Content columns */}
        <article className="space-y-12 text-[#4b5563] text-[15px] leading-[1.8] font-medium">
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">1. Scope of Use</h2>
            <p>
              Welcome to the digital atelier of Al Fahath Bags & Footwears. These Terms of Service regulate your access to and general usage of our boutique ecommerce concept website.
            </p>
            <p>
              By exploring our archive, submitting custom enquiries, or leaving product reflections, you accept these terms in full. If you disagree with any portion of these conditions, we must respectfully ask you to exit our digital space.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">2. Intellectual Heritage</h2>
            <p>
              The digital architecture, curation systems, imagery, typography layouts, icons, logos, and custom product designs showcased on this storefront are the sole heritage of AFB LUXE and protected under global trademark and copyright frameworks.
            </p>
            <p>
              Any attempt to reproduce, duplicate, or mirror our brand structure for commercial purposes without explicit, written consent from the Al Fahath Bags & Footwears atelier is strictly forbidden.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">3. Product Details & Dimensions</h2>
            <p>
              We endeavor to portray the textures, hues, dimensions, and specifications of our physical items with absolute visual parity. However, leather is an organic material, and hand-tailored footwear possesses natural variations.
            </p>
            <p>
              Dimensions provided are approximate, and small aesthetic differences represent a mark of authentic artisanal production rather than a manufacturing error.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">4. Custom Styling & Conversions</h2>
            <p>
              Our ecommerce model relies on custom conversion through our direct concierge channels. When you request details on a piece, you will be seamlessly put in contact with our WhatsApp service team.
            </p>
            <p>
              Pricing estimations, custom modifications, delivery schedules, and payment terms agreed upon during direct concierge conversations represent binding sales agreements once confirmed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">5. User Feedback and Conduct</h2>
            <p>
              We welcome authentic customer testimonies in our reflections panel. However, we reserve absolute authority to moderate, hide, or permanently remove reviews that contain abusive vernacular, commercial links, irrelevant content, or violate customer dignity.
            </p>
          </section>
        </article>

        <footer className="mt-20 pt-10 border-t border-black/5 flex justify-between text-[10px] font-black uppercase tracking-widest">
          <Link href="/privacy" className="text-gray-400 hover:text-[#071B34] transition-colors">Privacy Policy</Link>
          <Link href="/collection" className="text-[#C89B3C] hover:underline">Explore Collection</Link>
        </footer>
      </main>
    </div>
  );
}
