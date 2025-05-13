const express = require('express');
const router = express.Router();
const publicacionController = require('../controller/publicacion.controller');
const comentarioController = require('../controller/comentarios.controller');
const upload = require('../modules/publicaciones/subirIMG');
const { authUser } = require('../modules/auth/auth');

// Mostrar formulario para crear una nueva publicación
router.get('/publicacion', authUser, publicacionController.getRegisterPublicacion);

// Guardar nueva publicación
router.post('/publicar', authUser, upload.single('imagen'), publicacionController.registrarPublicacion);

// Mostrar formulario para editar publicación existente
router.get('/publicaciones/:id/editar', authUser, publicacionController.getEditarPublicacion);

// Guardar cambios de la edición
router.post('/publicaciones/:id/editar', authUser, upload.single('imagen'), publicacionController.editarPublicacion);

// Eliminar publicación
router.post('/publicaciones/:id/eliminar', authUser, publicacionController.eliminarPublicacion);

// Comentarios (agregar)
router.post('/comentar', authUser, comentarioController.registrarComentario);

// Comentarios (eliminar si tuvieras lógica de eliminación por usuario)
router.post('/comentar/eliminar', authUser, comentarioController.eliminarComentario);

module.exports = router;
