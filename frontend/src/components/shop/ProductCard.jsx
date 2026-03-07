import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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
    <motion.div 
      className="product-card"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="product-image-container">
        <img src={image_url} alt={name} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <motion.button 
            className="btn-add-cart" 
            onClick={handleAddToCart}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag size={18} />
            <span>Añadir al Carrito</span>
          </motion.button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{category_slug}</span>
        <h3 className="product-name">{name}</h3>
        <span className="product-price">${price.toFixed(2)}</span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
