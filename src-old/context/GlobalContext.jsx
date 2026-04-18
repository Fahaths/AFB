import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize data
  useEffect(() => {
    const savedProducts = localStorage.getItem('afb_products');
    const savedHero = localStorage.getItem('afb_hero_slides');
    const savedAuth = sessionStorage.getItem('afb_admin_auth');

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Default sample products
      const defaultProducts = [
        {
          id: '1',
          name: 'Classic Navy Tote',
          price: '249',
          description: 'A premium navy leather tote bag, perfect for any occasion.',
          image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80',
          category: 'bags'
        },
        {
          id: '2',
          name: 'Golden Elegance Clutch',
          price: '189',
          description: 'Handcrafted clutch with gold accents for evening wear.',
          image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd111c91?auto=format&fit=crop&q=80',
          category: 'bags'
        },
        {
          id: '3',
          name: 'Azure Shoulder Bag',
          price: '210',
          description: 'Modern shoulder bag with adjustable strap and premium finish.',
          image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80',
          category: 'bags'
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('afb_products', JSON.stringify(defaultProducts));
    }

    if (savedHero) {
      setHeroSlides(JSON.parse(savedHero));
    } else {
      const defaultHero = [
        {
          id: '1',
          tagline: 'Handcrafted Perfection',
          title: 'The Signature Heritage',
          subtitle: 'Experience the pinnacle of artisanal craftsmanship with our exclusive leather collection.',
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80'
        },
        {
          id: '2',
          tagline: 'Timeless Luxury',
          title: 'Crafted for Elegance',
          subtitle: 'A sophisticated blend of tradition and modern design for the discerning individual.',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80'
        }
      ];
      setHeroSlides(defaultHero);
      localStorage.setItem('afb_hero_slides', JSON.stringify(defaultHero));
    }

    if (savedAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('afb_products', JSON.stringify(newProducts));
  };

  const updateHeroSlides = (newSlides) => {
    setHeroSlides(newSlides);
    localStorage.setItem('afb_hero_slides', JSON.stringify(newSlides));
  };

  const login = () => {
    setIsAdmin(true);
    sessionStorage.setItem('afb_admin_auth', 'true');
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('afb_admin_auth');
  };

  return (
    <GlobalContext.Provider value={{
      products,
      heroSlides,
      updateProducts,
      updateHeroSlides,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
