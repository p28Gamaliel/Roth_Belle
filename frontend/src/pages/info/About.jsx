import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Nuestra Historia</h1>
        <p>Roth Belle Style nació de la pasión por la moda elegante, atemporal y accesible.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Elegancia en cada detalle</h2>
          <p>En Roth Belle creemos que la ropa que usas es una extensión de tu personalidad. Seleccionamos cuidadosamente cada tejido, cada corte y cada costura para asegurarnos de que nuestras prendas no solo luzcan increíbles, sino que te hagan sentir poderosa y segura de ti misma.</p>
          <br />
          <p>Nuestra colección está diseñada pensando en la mujer moderna que busca versatilidad sin sacrificar el estilo sofisticado.</p>
        </div>
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Detalle de telas elegantes Roth Belle" 
          />
        </div>
      </div>
      
      <div className="about-values">
        <h2>Nuestros Valores</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Calidad Premium</h3>
            <p>Materiales excepcionales que garantizan durabilidad y confort.</p>
          </div>
          <div className="value-card">
            <h3>Diseño Minimalista</h3>
            <p>Menos es más. Diseños limpios que nunca pasan de moda.</p>
          </div>
          <div className="value-card">
            <h3>Atención al Detalle</h3>
            <p>Desde el empaque hasta tu puerta, cuidamos cada paso de la experiencia.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
