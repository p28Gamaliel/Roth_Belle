import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotalPrice 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay background */}
      <div className="cart-overlay" onClick={closeCart}></div>
      
      {/* Sliding Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={closeCart} aria-label="Cerrar Carrito">
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío.</p>
              <button className="btn-continue" onClick={closeCart}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image_url || item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-title-row">
                      <h4>{item.name}</h4>
                      <button 
                        className="btn-remove" 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14}/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal:</span>
              <span>${cartTotalPrice.toFixed(2)}</span>
            </div>
            <p className="cart-taxes">Impuestos y envío calculados en el checkout.</p>
            <Link to="/checkout" className="btn-checkout" onClick={closeCart}>
              Proceder al Pago
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
