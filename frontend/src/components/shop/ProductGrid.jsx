import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '../../services/supabaseClient';
import './ProductGrid.css';

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch Categories
        const { data: catData, error: catError } = await supabase.from('categories').select('*');
        if (catError) throw catError;
        
        // Fetch Products
        const { data: prodData, error: prodError } = await supabase.from('products').select('*');
        if (prodError) throw prodError;

        setCategories([{ slug: 'all', name: 'Todos' }, ...catData]);
        setProducts(prodData);
      } catch (error) {
        console.error("Error al cargar datos desde Supabase:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on selected category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category_slug === activeCategory);

  return (
    <div className="product-module">
      <div className="module-header">
        <h2>Nuestra Colección</h2>
        <p>Explora las últimas tendencias en moda diseñadas para ti.</p>
      </div>
      
      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(cat => (
          <button 
            key={cat.slug}
            className={`filter-btn ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="empty-state">
          <p>Cargando colección exclusiva...</p>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <p>No se encontraron productos en esta categoría.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
