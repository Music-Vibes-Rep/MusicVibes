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

// Login
app.get('/login', (req, res) => {
  res.render('sign', { isRegister: false }); // Cambiado a sign.ejs y añadido isRegister
});

// Registro
app.get('/registro', (req, res) => {
  res.render('sign', { isRegister: true }); // Usar misma plantilla con variable diferente
});

// Manejo de envío de formularios
// Agrega estas rutas GET
app.get('/login', (req, res) => {
  res.render('sign', { isRegister: false });
});

app.get('/registro', (req, res) => {
  res.render('sign', { isRegister: true });
});


module.exports = app;
