const express = require('express');
const router = express.Router();
const feedController = require('../controller/feed.controller');
const eventosController = require('../controller/eventos.controller');

require('dotenv').config();

router.get('/', (req, res) => {
  const db = require('../modules/db/conection');
  const sql = 'SELECT * FROM Publicacion ORDER BY RAND() LIMIT 4';

  db.query(sql, (err, publicaciones) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err.message);
      publicaciones = [];
    }
//redireccion de usuario en caso de fallo
    res.render('landing', {
      usuario: req.session.usuario,
      publicaciones,
      eventos: eventosController.eventosMock
    });
  });
});

router.get('/feed', feedController.getFeed);

module.exports = router;
