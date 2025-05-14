const express = require('express');
const router = express.Router();
const eventosController = require('../controller/eventos.controller');

//rutas para los eventos, pendiente api para automatizar eventos

router.get('/eventos', eventosController.getEventos);

module.exports = router;
