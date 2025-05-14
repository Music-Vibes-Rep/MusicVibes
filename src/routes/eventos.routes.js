const express = require('express');
const router = express.Router();
const eventosController = require('../controller/eventos.controller');

router.get('/eventos', eventosController.getEventos);

module.exports = router;
