// src/app.js
const express = require('express');
const path = require('path');
const app = express();

//configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//pagina principal
app.get('/', (req, res) => {
  res.render('landing');
});

//pagina de login
app.get('/login', (req, res) => {
  res.render('sign', { isRegister: false });
});

//rutas
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

//pagina de registro
app.get('/registro', (req, res) => {
  res.render('sign', { isRegister: true });
});

module.exports = app;
