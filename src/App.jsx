import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CategoryPage from './pages/CategoryPage';
import AboutUs from './pages/AboutUs';
import { useGlobal } from './context/GlobalContext';

function App() {
  const location = useLocation();
  const { isAdmin } = useGlobal();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container">
      {!isAdminRoute && <Navbar />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/bags" element={<CategoryPage category="bags" />} />
            <Route path="/footwear" element={<CategoryPage category="footwear" />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            <Route path="/admin" element={<AdminLogin />} />
            {isAdmin && (
              <Route path="/admin/dashboard/*" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
              </Route>
            )}

            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
