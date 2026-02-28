import React from 'react';
import ProductGrid from '../components/shop/ProductGrid';

const Shop = () => {
  return (
    <div className="shop-page" style={{ paddingTop: '2rem' }}>
      <div className="shop-header" style={{
        textAlign: 'center', 
        padding: '3rem 2rem', 
        backgroundColor: 'var(--color-surface)',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Catálogo Exclusivo</h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Encuentra tu estilo perfecto entre nuestra cuidadosa selección de prendas.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
};

export default Shop;
