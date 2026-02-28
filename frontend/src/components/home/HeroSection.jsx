import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Viste con Elegancia. Viste Roth Belle.</h1>
        <p>Descubre nuestra nueva colección de temporada. Diseños exclusivos pensados para realzar tu belleza y estilo.</p>
        <div className="hero-actions">
          <Link to="/shop" className="btn btn-primary">Comprar Ahora</Link>
          <Link to="/about" className="btn btn-outline">Saber Más</Link>
        </div>
      </div>
      <div className="hero-image">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Modelo luciendo ropa elegante de Roth Belle"
        />
      </div>
    </section>
  );
};

export default HeroSection;
