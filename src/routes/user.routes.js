const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Rutas de usuario
router.get('/registro', userController.getRegister);
router.post('/register', userController.registrarUsuario);

router.get('/login', userController.getLogin);
router.post('/login', userController.loginUsuario);

router.post('/logout', userController.logoutUsuario);

module.exports = router;
