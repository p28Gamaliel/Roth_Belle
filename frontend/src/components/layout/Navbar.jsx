import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const { toggleCart, cartTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Botón de Menú Hamburguesa (Solo Móvil) */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <h2>Roth Belle</h2>
            <span>STYLE</span>
          </Link>
        </div>

        <ul className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/" onClick={closeMobileMenu}>Inicio</Link></li>
          <li><Link to="/shop" onClick={closeMobileMenu}>Catálogo</Link></li>
          <li><Link to="/about" onClick={closeMobileMenu}>Nosotros</Link></li>
        </ul>

        <div className="navbar-actions">
          <button aria-label="Buscar"><Search size={20} /></button>
          
          {user ? (
            <button aria-label="Cerrar sesión" onClick={handleSignOut} title="Cerrar sesión">
              <LogOut size={20} />
            </button>
          ) : (
            <Link to="/login" aria-label="Usuario" title="Iniciar sesión" style={{ display: 'flex' }} onClick={closeMobileMenu}>
              <User size={20} />
            </Link>
          )}

          <button className="cart-btn" aria-label="Carrito" onClick={toggleCart}>
            <ShoppingBag size={20} />
            {cartTotalItems > 0 && <span className="cart-count">{cartTotalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
