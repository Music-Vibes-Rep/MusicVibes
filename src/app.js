// src/app.js
const express = require('express');
const path = require('path');
const app = express();

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');

// Configurar la carpeta de vistas y archivos estáticos
app.set('views', path.join(__dirname, 'views'));  // Definir dónde están las vistas
app.use(express.static(path.join(__dirname, 'public')));  // Servir archivos estáticos desde la carpeta `public`

// Middleware global
app.use(express.urlencoded({ extended: true }));  // Para manejar datos de formularios

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.render('landing'); // Renderiza la vista `landing.ejs`
});

module.exports = app;
