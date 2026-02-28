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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await signOut();
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      closeMobileMenu();
    }
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
          
          <div className="search-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
            <form 
              onSubmit={handleSearchSubmit} 
              className={`search-form ${isSearchOpen ? 'open' : ''}`}
            >
              <input 
                type="text" 
                placeholder="Buscar prenda..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button 
              aria-label="Buscar" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>
          
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
