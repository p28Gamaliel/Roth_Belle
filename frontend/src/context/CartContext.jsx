import React, { createContext, useContext, useState, useEffect } from 'react';

// Initialize context
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Check LocalStorage for existing cart data
    const localData = localStorage.getItem('rothBelleCart');
    return localData ? JSON.parse(localData) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem('rothBelleCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Add Item to Cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Upgrade quantity if product already in cart
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Add new product
      return [...prevItems, { ...product, quantity }];
    });
    openCart(); // Auto open cart when adding
  };

  // Remove completely from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };


  // Update quantity strictly (increment/decrement)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => setCartItems([]);

  // Compute Totals
  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const value = {
    cartItems,
    isCartOpen,
    toggleCart,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalItems,
    cartTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
