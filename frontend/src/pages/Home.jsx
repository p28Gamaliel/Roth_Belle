import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProductGrid from '../components/shop/ProductGrid';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <ProductGrid />
    </div>
  );
};
export default Home;
