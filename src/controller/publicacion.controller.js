const bcrypt = require('bcrypt');
const { publicacion: publicacionPlantilla, publicacion } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');

//este registra el usuario
exports.getRegister = (req, res) => {
  res.render('publicacion');
};
/*
//aqui guardara el usuario login
exports.getLogin = (req, res) => {
  res.render('login');
};
*/
exports.registrarPublicacion = async (req, res) => {
  const { contenido, foto, id_usuario } = req.body;
/*
  if (Array.isArray(es_musico)) {
    es_musico = es_musico.includes('1') ? 1 : 0;
  } else {
    es_musico = parseInt(es_musico) || 0;
  }
*/
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const publicacion = { ...publicacionPlantilla };
    publicacion.contenido = contenido;
    publicacion.foto = foto;
    publicacion.id_usuario = id_usuario;

    UserModel.create(publicacion, (err) => {
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

    req.session.usuarioId = publicacion.id_publicacion;
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
