const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

// Ruta principal del perfil
router.get('/', perfilController.mostrarPerfil);

module.exports = router;
