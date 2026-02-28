import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { name, price, image_url, category_slug } = product;
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    addToCart(product);
    toast.success(`${name} añadido al carrito`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image_url} alt={name} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <button className="btn-add-cart" onClick={handleAddToCart}>
            <ShoppingBag size={18} />
            <span>Añadir al Carrito</span>
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{category_slug}</span>
        <h3 className="product-name">{name}</h3>
        <span className="product-price">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
