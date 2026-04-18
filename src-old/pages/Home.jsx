import React from 'react';
import { motion } from 'framer-motion';
import HeroSlider from '../components/Home/HeroSlider';
import LatestCollection from '../components/Home/LatestCollection';
import { useGlobal } from '../context/GlobalContext';

const Home = () => {
  const { products, heroSlides } = useGlobal();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSlider slides={heroSlides} />

      <LatestCollection />
    </motion.div>
  );
};

export default Home;
