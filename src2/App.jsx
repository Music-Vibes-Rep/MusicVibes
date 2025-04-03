// App.jsx
import React from 'react';
import Navbar from './components/navegacion';
import Recomendamos from './components/recomendamos';
import Footer from './components/footer';

function App() {

  // Datos de ejemplo para los músicos
  const musicosRecomendados = [
    { id: 1, nombre: 'Musico 1' },
    { id: 2, nombre: 'Musico 2' },
    { id: 3, nombre: 'Musico 3' },
    { id: 4, nombre: 'Musico 4' },
    { id: 4, nombre: 'Musico 5' },
  ];

  return (
    <div>
      <Navbar />
      <Recomendamos musicos={musicosRecomendados} />               
      <Footer />
    </div>
  );
}

export default App;
