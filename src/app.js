// src/app.js
const express = require('express');
const path = require('path');
const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Página principal
app.get('/', (req, res) => {
  res.render('landing');
});

// Página de login
app.get('/login', (req, res) => {
  res.render('sign', { isRegister: false });
});

// Página de registro
app.get('/register', (req, res) => {
  res.render('sign', { isRegister: true });
});

module.exports = app;
