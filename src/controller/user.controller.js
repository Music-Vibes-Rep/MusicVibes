const bcrypt = require('bcrypt');
const UserModel = require('../modules/auth/registro');
const { usuario: usuarioPlantilla } = require('../modules/db/objetosBD');

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
      if (err) {
        console.error('Error al guardar:', err.message);
        return res.status(500).send('Error al guardar');
      }

      res.send('Datos guardados con éxito');
    });
  } catch (err) {
    console.error('Error en registro:', err.message);
    res.status(500).send('Error interno del servidor');
  }
};
exports.getRegister = (req, res) => {
    res.render('sign', { isRegister: true });
  };
  