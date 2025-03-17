import React from 'react';
import './App.css'; // Importa los estilos
import logo from './logo.svg'; // Importa el logo

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
    <div className="links">
      <a href="#home">Enlaces</a>
    </div>
    <button className="login-btn">Accede</button>
  </nav>
);

const HeroSection = () => (
  <section className="hero">
    <h1>My Vibe My Music</h1>
  </section>
);

const Recommendations = () => (
  <section className="recommendations">
    <h2>Te recomendamos...</h2>
    <div className="cards">
      {['Música 1', 'Música 2', 'Música 3', 'Música 4'].map((music, index) => (
        <div key={index} className="card">
          <div className="image-placeholder"></div>
          <p>{music}</p>
        </div>
      ))}
    </div>
    <button className="view-more-btn">Ver más</button>
  </section>
);

const FeaturedEvents = () => (
  <section className="featured-events">
    <h2>Eventos destacados</h2>
    <div className="grid">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="event-card">
          <div className="image-placeholder"></div>
        </div>
      ))}
    </div>
  </section>
);

const JoinUs = () => (
  <section className="join-us">
    <h2>Únete a nosotros</h2>
    <button className="join-btn">Unirse</button>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <a href="#social-links">Enlaces de redes</a>
    <a href="#other-links">Otros enlaces</a>
  </footer>
);

const App = () => (
  <>
    <Navbar />
    <HeroSection />
    <Recommendations />
    <FeaturedEvents />
    <JoinUs />
    <Footer />
  </>
);

export default App;
