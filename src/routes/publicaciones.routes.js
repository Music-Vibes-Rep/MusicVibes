const express = require('express');
const router = express.Router();
const publicacionController = require('../controller/publicacion.controller');
const comentarioController = require('../controller/comentarios.controller');
const upload = require('../modules/publicaciones/subirIMG');
const {authUser} = require('../modules/auth/auth');


// Rutas de publicación
router.get('/publicacion', authUser, publicacionController.getRegisterPublicacion);
router.post('/publicar', upload.single('imagen'), authUser, publicacionController.registrarPublicacion);

//comentarios
router.post('/comentar', authUser, comentarioController.registrarComentario);
router.post('/comentar', authUser, comentarioController.eliminarComentario);


module.exports = router;
