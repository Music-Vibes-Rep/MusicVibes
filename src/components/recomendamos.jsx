// src/components/Recomendamos.jsx
import React from 'react';

function Recomendamos({ musicos }) {
  return (
    <div>
      {/* Sección "Te recomendamos..." */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Te recomendamos...</h2>
        <div className="flex justify-center space-x-4">
          {/* Tarjetas de música */}
          {musicos.map((musico) => (
            <div key={musico.id} className="bg-white rounded-lg shadow-md p-4 w-64">
              <div className="bg-yellow-200 h-32 mb-2 rounded">
                {/* Aquí podrías poner la imagen del músico */}
              </div>
              <p className="text-gray-700">{musico.nombre}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Ver más</button>
        </div>
      </section>

      {/* Sección "Eventos destacados" */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Eventos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Eventos destacados */}
          <div className="bg-yellow-200 h-48 rounded"></div>
          <div className="bg-yellow-200 h-32 rounded"></div>
          <div className="bg-yellow-200 h-32 rounded"></div>
          <div className="bg-yellow-200 h-32 rounded"></div>
          <div className="bg-yellow-200 h-48 md:col-span-2 rounded"></div>
        </div>
      </section>

      {/* Sección "Únete a nosotros" */}
      <section className="bg-gray-200 py-8 text-center">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Únete a nosotros</h2>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Unirse!</button>
        </div>
      </section>
    </div>
  );
}

export default Recomendamos;
