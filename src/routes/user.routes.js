
//aqui pondremos todas las rutas 

const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/registro', userController.getRegister);
router.post('/register', userController.registrarUsuario);

router.get('/login', userController.getLogin); 

module.exports = router;
