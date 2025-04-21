// src/app.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

//configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//configurar session
app.use(session({
  secret: 'clave_secreta_super_segura',
  resave: false,
  saveUninitialized: false
}));

//pagina principal
app.get('/', (req, res) => {
  res.render('landing', { usuario: req.session.usuario });
});

//rutas
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);


module.exports = app;
