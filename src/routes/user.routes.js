const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const multer = require('multer');
const path = require('path');
const { authUser } = require('../modules/auth/auth');
const followController = require('../controller/follow.controller');

// Configurar multer para fotos de perfil
const storagePerfil = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/assets/perfil'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const uploadPerfil = multer({ storage: storagePerfil });

// Registro
router.get('/registro', userController.getRegister);
router.post('/register', userController.registrarUsuario);

// Login
router.get('/login', userController.getLogin);
router.post('/login', userController.loginUsuario);

// Logout
router.post('/logout', userController.logoutUsuario);

// Perfil
router.get('/perfil', userController.getProfile);
router.post('/perfil/editar', uploadPerfil.single('foto_perfil'), userController.editarPerfil);
router.post('/usuario/eliminar', userController.eliminarUsuario);

// Políticas
router.get('/privacity', userController.getPrivacidad);

// Ver perfil de otros usuarios y follow/unfollow
router.get('/usuario/:id', followController.verPerfilPublico);
router.post('/usuario/:id/follow', authUser, followController.toggleFollow);


module.exports = router;
