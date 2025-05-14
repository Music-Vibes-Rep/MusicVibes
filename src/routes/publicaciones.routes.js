const express = require('express');
const router = express.Router();
const publicacionController = require('../controller/publicacion.controller');
const comentarioController = require('../controller/comentarios.controller');
const upload = require('../modules/publicaciones/subirIMG');
const { authUser } = require('../modules/auth/auth');


//formulario para crear una nueva publicacion
router.get('/publicacion', authUser, publicacionController.getRegisterPublicacion);


// Guardar publicación
router.post('/publicar', authUser, upload.single('imagen'), publicacionController.registrarPublicacion);


// Mostrar formulario para editar 
router.get('/publicaciones/:id/editar', authUser, publicacionController.getEditarPublicacion);


// Guardar cambios edicion
router.post('/publicaciones/:id/editar', authUser, upload.single('imagen'), publicacionController.editarPublicacion);


// Eliminar publi
router.post('/publicaciones/:id/eliminar', authUser, publicacionController.eliminarPublicacion);


// Agregar Comentarios 
router.post('/comentar', authUser, comentarioController.registrarComentario);


// eliminar comentrairo
router.post('/comentario/eliminar', authUser, comentarioController.eliminarComentario);


module.exports = router;
