const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Registro
router.get('/registro', userController.getRegister);
router.post('/register', userController.registrarUsuario);

// Login
router.get('/login', userController.getLogin);
router.post('/login', userController.loginUsuario);

// Logout
router.get('/logout', userController.logoutUsuario);

// Perfil
router.get('/perfil', userController.getProfile);

// privacidad
router.get('/privacity', userController.getPrivacidad);


module.exports = router;

