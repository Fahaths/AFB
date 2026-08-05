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
  metadataBase: new URL("https://afb-luxe.com"),
  title: "Al Fahath Bags & Footwears | Premium Collection",
  description: "Experience luxury with Al Fahath Bags & Footwears.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "wiaJVjaD3M7KqfY7K9MFPrpe8yhX8oAREqyznIbmw8Y",
  },
  openGraph: {
    images: "/logo.png",
  },
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Store",
                "name": "Al Fahath Bags & Footwears",
                "image": "https://afb-luxe.com/logo.png",
                "@id": "https://afb-luxe.com/#store",
                "url": "https://afb-luxe.com",
                "telephone": "+91-9840031124",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "no:236, Thirumanjana Gopuram St, Ganesapuram",
                  "addressLocality": "Tiruvannamalai",
                  "addressRegion": "Tamil Nadu",
                  "postalCode": "606601",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 12.2251,
                  "longitude": 79.0747
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "09:00",
                  "closes": "21:00"
                },
                "sameAs": [
                  "https://www.instagram.com/afb_luxe",
                  "https://www.facebook.com/afb_luxe"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Al Fahath Bags & Footwears",
                "url": "https://afb-luxe.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://afb-luxe.com/collection?search={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
