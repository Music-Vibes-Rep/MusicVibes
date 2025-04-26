const express = require('express');
const router = express.Router();
const publicacionController = require('../controller/publicacion.controller');


// Rutas de publicación
router.get('/publicacion', publicacionController.getRegisterPublicacion);
router.post('/publicar', publicacionController.registrarPublicacion);

module.exports = router;
