'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Common/Navbar';
import Footer from '@/components/Common/Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Define routes where Navbar/Footer should be hidden
  const isAdminPage = pathname?.startsWith('/admin');
  
  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
