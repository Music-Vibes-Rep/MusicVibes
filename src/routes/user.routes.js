const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const multer = require('multer');
const path = require('path');

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

// Editar Perfil (💡 con multer)
router.post('/perfil/editar', uploadPerfil.single('foto_perfil'), userController.editarPerfil);

// Eliminar usuario
router.post('/eliminar', userController.eliminarUsuario);

// Políticas
router.get('/privacity', userController.getPrivacidad);

module.exports = router;
