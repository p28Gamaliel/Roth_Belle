import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <h3>Roth Belle</h3>
            <span>STYLE</span>
          </Link>
          <p>Elegancia y estilo sofisticado para cada ocasión. Descubre tu mejor versión con nosotros.</p>
        </div>
        <div className="footer-section">
          <h4>Enlaces de Interés</h4>
          <ul>
            <li><Link to="/shop">Catálogo</Link></li>
            <li><Link to="/about">Nosotros</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Roth Belle Style. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
