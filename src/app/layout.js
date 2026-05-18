import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import ConditionalLayout from "@/components/Layout/ConditionalLayout";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "AFB LUXE | Premium Collection",
  description: "Experience luxury with Al Fahath Bags and Footwear.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Toaster position="bottom-right" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AFB LUXE",
              "url": "https://afb-luxe.com",
              "logo": "https://afb-luxe.com/logo.png",
              "description": "Experience luxury with Al Fahath Bags and Footwear.",
              "sameAs": [
                "https://www.instagram.com/afb_luxe",
                "https://www.facebook.com/afb_luxe"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9840031124",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["en", "Tamil"]
              }
            })
          }}
        />
      </body>
    </html>
  );
}
