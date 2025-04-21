const bcrypt = require('bcrypt');
const UserModel = require('../modules/auth/registro');
const { usuario: usuarioPlantilla } = require('../modules/db/objetosBD');

// Vista de registro
exports.getRegister = (req, res) => {
  res.render('register');
};

// Vista de login
exports.getLogin = (req, res) => {
  res.render('login');
};

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, apellido, password, es_musico } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = { ...usuarioPlantilla };
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.password = hashedPassword;
    usuario.es_musico = es_musico;

    UserModel.create(usuario, (err) => {
      if (err) return res.status(500).send('Error al guardar');
      res.redirect('/login');
    });
  } catch (err) {
    res.status(500).send('Error interno del servidor');
  }
};
