import Navbar from '@/components/Common/Navbar';
import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy | Al Fahath Bags & Footwears",
  description: "Learn how Al Fahath Bags & Footwears manages and protects your premium digital privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#071B34] font-sans pb-32">
      <Navbar />
      
      <main className="max-w-[800px] mx-auto px-6 pt-40 md:pt-48">
        {/* Header section */}
        <header className="mb-20 text-center md:text-left">
          <span className="text-[#C89B3C] font-black uppercase tracking-[0.5em] text-[10px] block mb-4">Atelier Legal</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Last Updated: May 18, 2026</p>
        </header>

        {/* Content columns */}
        <article className="space-y-12 text-[#4b5563] text-[15px] leading-[1.8] font-medium">
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">1. Our Commitment</h2>
            <p>
              At Al Fahath Bags & Footwears, we cherish the intimacy of our relationship with our clients. We believe that protecting your personal details is just as critical as selecting the finest leathers and crafting perfect soles.
            </p>
            <p>
              This Privacy Policy explains how we collect, store, and utilize your personal information when you use our luxury website, submit an enquiry, or engage with our concierge service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">2. Data We Collect</h2>
            <p>
              To provide a bespoke experience, we collect specific details from you, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Information:</strong> Your name, email address, phone number, and physical coordinates.</li>
              <li><strong>Custom Enquiries:</strong> Data shared when you complete our custom enquiry forms or reach out to our concierge via WhatsApp.</li>
              <li><strong>Product Reflections:</strong> Customer names, ratings, and testimonies that you choose to upload to the public space of our storefront.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">3. How Your Data Is Utilized</h2>
            <p>
              Your data is never commodified or rented to third-party institutions. We use it solely to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process and fulfill your curated product enquiries.</li>
              <li>Coordinate WhatsApp conversions and direct atelier communications.</li>
              <li>Deliver news of exclusive archive releases and invitation-only collections.</li>
              <li>Refine the user experience and design layout of our digital storefront.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">4. Concierge Communications</h2>
            <p>
              Our primary tool for processing custom orders and styling advice is WhatsApp. By using our direct chat integration, you engage directly with the Al Fahath Bags & Footwears atelier, operating under standard WhatsApp encryption and terms of service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#071B34] border-b border-black/5 pb-2">5. Data Deletion & Enquiries</h2>
            <p>
              You maintain total authority over your records. If you wish to examine, edit, or request the permanent deletion of your review or enquiry records from our Supabase servers, please reach out to our legal division directly.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm mt-4 text-[#071B34]">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C] mb-2">Legal Division & Concierge Desk</p>
              <p className="text-sm font-black">Email: alfahathbagsandfootwear@gmail.com</p>
              <p className="text-sm font-black">Phone: +91 98400 31124</p>
            </div>
          </section>
        </article>

        <footer className="mt-20 pt-10 border-t border-black/5 flex justify-between text-[10px] font-black uppercase tracking-widest">
          <Link href="/terms" className="text-gray-400 hover:text-[#071B34] transition-colors">Terms of Service</Link>
          <Link href="/collection" className="text-[#C89B3C] hover:underline">Explore Collection</Link>
        </footer>
      </main>
    </div>
  );
}
