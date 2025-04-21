const bcrypt = require('bcrypt');
const UserModel = require('../modules/auth/registro');
const { usuario: usuarioPlantilla } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.registrarUsuario = async (req, res) => {
  const { nombre, email, apellido, password } = req.body;
  let es_musico = req.body.es_musico;

  if (Array.isArray(es_musico)) {
    es_musico = es_musico.includes('1') ? 1 : 0;
  } else {
    es_musico = parseInt(es_musico) || 0;
  }

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

exports.loginUsuario = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM Usuario WHERE email = ? LIMIT 1';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }

    const usuario = results[0];
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).send('Contraseña incorrecta');
    }

    req.session.usuarioId = usuario.id_usuario;
    req.session.usuario = {
      nombre: usuario.nombre
    };
    res.redirect('/');
  });
};

exports.logoutUsuario = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
