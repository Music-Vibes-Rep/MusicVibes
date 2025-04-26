const express = require('express');
const router = express.Router();
const publicacionController = require('../controller/publicacion.controller');
const upload = require('../modules/publicaciones/subirIMG');


// Rutas de publicación
router.get('/publicacion', publicacionController.getRegisterPublicacion);
router.post('/publicar', upload.single('imagen'), publicacionController.registrarPublicacion);



module.exports = router;
