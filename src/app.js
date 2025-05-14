const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./modules/db/conection');
require('dotenv').config();
const eventosMock = require('./controller/eventos.controller').eventosMock;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets/publicaciones', express.static(path.join(__dirname, 'public/assets/publicaciones')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'clave_secreta_super_segura',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM Publicacion ORDER BY RAND() LIMIT 4';
  db.query(sql, (err, publicaciones) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err.message);
      publicaciones = [];
    }

    res.render('landing', {
      usuario: req.session.usuario,
      publicaciones,
      eventos: eventosMock
    });
  });
});

app.use('/', require('./routes/user.routes'));
app.use('/', require('./routes/publicaciones.routes'));
app.use('/', require('./routes/like.routes'));
app.use('/', require('./routes/eventos.routes'));
app.use(require('./routes/feed.routes'));

app.listen(8081, () => {
  console.log('Servidor corriendo en http://localhost:8081');
});

module.exports = app;
