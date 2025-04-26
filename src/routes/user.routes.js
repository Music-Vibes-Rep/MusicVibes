const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const publicacionController = require('../controller/publicacion.controller');

// Rutas de usuario
router.get('/registro', userController.getRegister);
router.post('/register', userController.registrarUsuario);

router.get('/login', userController.getLogin);
router.post('/login', userController.loginUsuario);

router.post('/logout', userController.logoutUsuario);

// Rutas de publicación
router.get('/publicar', publicacionController.getRegisterPublicacion);
router.post('/publicar', publicacionController.registrarPublicacion);

module.exports = router;
