const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Configurar sesiones
app.use(session({
  secret: 'clave_secreta_super_segura',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Página principal
app.get('/', (req, res) => {
  res.render('landing', { usuario: req.session.usuario });
});

// Rutas
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

const publicacionRoutes = require('./routes/publicaciones.routes');
app.use('/', publicacionRoutes);

module.exports = app;
