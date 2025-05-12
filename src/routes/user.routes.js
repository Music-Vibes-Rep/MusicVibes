const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Registro
router.get('/registro', userController.getRegister);
router.post('/register', userController.registrarUsuario);

//Eliminar
router.post('/eliminar', userController.eliminarUsuario);

// Login
router.get('/login', userController.getLogin);
router.post('/login', userController.loginUsuario);

// Logout
router.post('/logout', userController.logoutUsuario);

// Perfil
router.get('/perfil', userController.getProfile);

// Editar Perfil
router.post('/perfil/editar', userController.editarPerfil);


// Politicas de Privacidad
router.get('/privacity', userController.getPrivacidad);

module.exports = router;
