const express = require('express');
const router = express.Router();
const publicacionController = require('../controller/publicacion.controller');
const upload = require('../modules/publicaciones/subirIMG');
const {authUser} = require('../modules/auth/auth');


// Rutas de publicación
router.get('/publicacion', authUser, publicacionController.getRegisterPublicacion);
router.post('/publicar', upload.single('imagen'), authUser, publicacionController.registrarPublicacion);



module.exports = router;
