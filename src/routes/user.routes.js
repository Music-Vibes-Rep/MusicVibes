
//aqui pondremos todas las rutas 

const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const publicacionController = require('../controller/publicacion.controller');

router.get('/registro', userController.getRegister);
router.post('/register', userController.registrarUsuario);

router.get('/login', userController.getLogin); 
router.post('/login', userController.loginUsuario);

router.post('/logout', userController.logoutUsuario);

router.get('/publicacion', publicacionController.getRegister);
router.post('/publicacion', publicacionController.registrarPublicacion);


module.exports = router;
