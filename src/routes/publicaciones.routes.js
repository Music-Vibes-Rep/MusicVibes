const express = require('express');
const router = express.Router();
const publicacionController = require('../controller/publicacion.controller');
const comentarioController = require('../controller/comentarios.controller');
const upload = require('../modules/publicaciones/subirIMG');
const { authUser } = require('../modules/auth/auth');

// Publicaciones
router.get('/publicacion', authUser, publicacionController.getRegisterPublicacion);
router.post('/publicar', authUser, upload.single('imagen'), publicacionController.registrarPublicacion);
router.get('/publicaciones/:id/editar', authUser, publicacionController.getEditarPublicacion);
router.post('/publicaciones/:id/editar', authUser, upload.single('imagen'), publicacionController.editarPublicacion);
router.post('/publicaciones/:id/eliminar', authUser, publicacionController.eliminarPublicacion);

// Comentarios (JSON para AJAX)
router.post('/comentar', authUser, express.json(), comentarioController.registrarComentario);
router.delete('/comentario/eliminar', authUser, express.json(), comentarioController.eliminarComentario);

module.exports = router;
