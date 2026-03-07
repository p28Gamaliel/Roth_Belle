import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import ProductGrid from '../components/shop/ProductGrid';

const Home = () => {
  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <ProductGrid />
      </motion.div>
    </motion.div>
  );
};
export default Home;
