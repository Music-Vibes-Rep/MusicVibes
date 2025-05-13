const express = require('express');
const router = express.Router();

const publicacionController = require('../controller/publicacion.controller');
const comentarioController = require('../controller/comentarios.controller');
const upload = require('../modules/publicaciones/subirIMG');
const { authUser } = require('../modules/auth/auth');

// Rutas de publicación
router.get('/publicacion', authUser, publicacionController.getRegisterPublicacion);

// Publicar con middleware de autenticación y subida de imagen
router.post('/publicar', authUser, upload.single('imagen'), publicacionController.registrarPublicacion);

// Comentarios
router.post('/comentar', authUser, comentarioController.registrarComentario);
router.post('/eliminar-comentario', authUser, comentarioController.eliminarComentario);

module.exports = router;
