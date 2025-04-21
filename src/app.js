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

//rutas
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);


module.exports = app;
