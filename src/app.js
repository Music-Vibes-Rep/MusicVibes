const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const db = require('./modules/db/conection');

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets/publicaciones', express.static(path.join(__dirname, 'public/assets/publicaciones')));

// Middleware para parsear datos del body
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
  const sql = 'SELECT * FROM Publicacion ORDER BY RAND() LIMIT 4';

  db.query(sql, (err, publicaciones) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err.message);
      publicaciones = [];
    }
    res.render('landing', { usuario: req.session.usuario, publicaciones });
  });
});

// Rutas
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

const publicacionRoutes = require('./routes/publicaciones.routes');
app.use('/', publicacionRoutes);

const feedRoutes = require('./routes/feed.routes');
app.use(feedRoutes);


module.exports = app;
