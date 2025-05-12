const express = require('express');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const db = require('./modules/db/conection');
require('dotenv').config(); 

const app = express();

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/assets/perfil'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });
app.use(upload.single('foto_perfil'));

// Middleware estático y body-parser
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets/publicaciones', express.static(path.join(__dirname, 'public/assets/publicaciones')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Rutas del sistema
app.use('/', require('./routes/user.routes'));
app.use('/', require('./routes/publicaciones.routes'));
app.use('/', require('./routes/like.routes'));
app.use('/', require('./routes/eventos.routes'));
app.use(require('./routes/feed.routes'));

// Iniciar servidor
app.listen(8081, () => {
  console.log('Servidor corriendo en http://localhost:8081');
});

module.exports = app;
