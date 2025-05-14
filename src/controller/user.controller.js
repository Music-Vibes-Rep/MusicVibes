const bcrypt = require('bcrypt');
const UserModel = require('../modules/auth/registro');
const { usuario: usuarioPlantilla } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');
const Swal = require('sweetalert2')

//queries

const sqlUser = `
    SELECT u.id_usuario, u.Nombre AS nombre, u.Apellido AS apellido, u.email, u.password,
           u.foto_perfil, u.descripcion, u.id_instrumento, u.id_provincia, u.es_musico,
           i.Nombre AS instrumento_nombre, p.Provincia AS provincia_nombre
    FROM Usuario u
    LEFT JOIN Instrumento i ON u.id_instrumento = i.id_instrumento
    LEFT JOIN Provincia p ON u.id_provincia = p.id_provincia
    WHERE u.id_usuario = ?
  `;

const sqlPub = 'SELECT * FROM Publicacion WHERE id_usuario = ? ORDER BY fecha_publicacion DESC';
const sqlInst = 'SELECT * FROM Instrumento';
const sqlProv = 'SELECT * FROM Provincia';

const sqlUsuario = `
    SELECT u.id_usuario, u.Nombre, u.Apellido, u.descripcion, u.foto_perfil,
           u.es_musico, i.Nombre AS instrumento, p.Provincia AS provincia
    FROM Usuario u
    LEFT JOIN Instrumento i ON u.id_instrumento = i.id_instrumento
    LEFT JOIN Provincia p ON u.id_provincia = p.id_provincia
    WHERE u.id_usuario = ?
  `;

const sqlPublicaciones = `
    SELECT * FROM Publicacion
    WHERE id_usuario = ? ORDER BY fecha_publicacion DESC
  `;

const sqlFollowCheck = `
    SELECT * FROM Follow WHERE seguidor = ? AND seguido = ?
  `;

const sqlContadores = `
    SELECT
      (SELECT COUNT(*) FROM Follow WHERE seguido = ?) AS seguidores,
      (SELECT COUNT(*) FROM Follow WHERE seguidor = ?) AS siguiendo
  `;
const sqlExiste = 'SELECT * FROM Follow WHERE seguidor = ? AND seguido = ?';
const sqlInsert = 'INSERT INTO Follow (seguidor, seguido) VALUES (?, ?)';
const sqlDelete = 'DELETE FROM Follow WHERE seguidor = ? AND seguido = ?';



// Mostrar formulario de registro
exports.getRegister = (req, res) => {
  if (req.session.usuario) return res.redirect('/');
  res.render('register');
};

// Política de privacidad
exports.getPrivacidad = (req, res) => {
  const usuario = req.session.usuario || null;
  res.render('privacity', { usuario });
};

// Login
exports.getLogin = (req, res) => {
  if (req.session.usuario) return res.redirect('/');
  res.render('login', { isRegister: false });
};

// Perfil propio del usuario
exports.getProfile = (req, res) => {
  if (!req.session.usuario) return res.redirect('/login');

  const id_usuario = req.session.usuario.id;

 

  db.query(sqlUser, [id_usuario], (err, resultUsuario) => {
    if (err || resultUsuario.length === 0) {
      //console.error('Error al obtener usuario:', err?.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al obtener usuario",
      });
      return res.status(500).send('Error al obtener usuario');
    }

    const usuario = resultUsuario[0];

    db.query(sqlPub, [id_usuario], (err, publicaciones) => {
      if (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al obtener publicaciones",
        });
        return res.status(500).send('Error al obtener publicaciones');
      }

      db.query(sqlInst, (err, instrumentos) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al obtener instrumentos",
          });
          return res.status(500).send('Error al obtener instrumentos');
        }

        db.query(sqlProv, (err, provincias) => {
          if (err) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al obtener provincias",
            });
            return res.status(500).send('Error al obtener provincias');
          }

          res.render('perfil', {
            usuario,
            publicacion: publicaciones,
            instrumentos,
            provincias
          });
        });
      });
    });
  });
};

// Editar perfil
exports.editarPerfil = (req, res) => {
  if (!req.session.usuario) return res.redirect('/login');

  const id_usuario = req.session.usuario.id;
  const { nombre, apellido, descripcion, id_instrumento, id_provincia, es_musico } = req.body;
  const nuevaFoto = req.file ? '/assets/perfil/' + req.file.filename : req.session.usuario.foto_perfil;

  const sql = `
    UPDATE Usuario SET Nombre = ?, Apellido = ?, descripcion = ?, foto_perfil = ?,
    id_instrumento = ?, id_provincia = ?, es_musico = ? WHERE id_usuario = ?
  `;

  db.query(sql, [
    nombre, apellido, descripcion, nuevaFoto,
    id_instrumento || null, id_provincia || null,
    parseInt(es_musico) || 0, id_usuario
  ], (err) => {
    if (err) return res.status(500).send('Error al actualizar perfil');

    req.session.usuario = {
      ...req.session.usuario,
      nombre, apellido, descripcion,
      foto_perfil: nuevaFoto,
      id_instrumento, id_provincia,
      es_musico: parseInt(es_musico)
    };

    res.redirect('/perfil');
  });
};

// Registro
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, apellido, password } = req.body;
  let es_musico = req.body.es_musico;
  if (Array.isArray(es_musico)) es_musico = es_musico.includes('1') ? 1 : 0;
  else es_musico = parseInt(es_musico) || 0;

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
    //res.status(500).send('Error interno del servidor');
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error interno del servidor",
    });
  }
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
  const id_usuario = req.session.usuario?.id;
  if (!id_usuario) return res.redirect('/login');

  const sql = 'DELETE FROM Usuario WHERE id_usuario = ?';
  db.query(sql, [id_usuario], (err) => {
    if (err) {
      //console.error('Error al eliminar cuenta:', err?.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al eliminar cuenta",
      });
      return res.status(500).send('Error al eliminar cuenta');
    }
    req.session.destroy(() => res.redirect('/'));
  });
};

// Login
exports.loginUsuario = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM Usuario WHERE email = ? LIMIT 1';

  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Usuario no encontrado');

    const usuario = results[0];
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(401).send('Contraseña incorrecta');

    req.session.usuario = {
      id: usuario.id_usuario,
      nombre: usuario.Nombre,
      apellido: usuario.Apellido,
      email: usuario.email,
      es_musico: usuario.es_musico,
      foto_perfil: usuario.foto_perfil,
      descripcion: usuario.descripcion,
      id_instrumento: usuario.id_instrumento,
      id_provincia: usuario.id_provincia
    };

    res.redirect('/');
  });
};

// Logout
exports.logoutUsuario = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

// Ver perfil público
exports.verPerfilPublico = (req, res) => {
  const id_usuario_visto = parseInt(req.params.id);
  const id_usuario_logueado = req.session.usuario?.id || null;

  if (!id_usuario_visto) return res.status(404).send('Usuario no válido');

  db.query(sqlUsuario, [id_usuario_visto], (err, usuarios) => {
    if (err || usuarios.length === 0) return res.status(404).send('Usuario no encontrado');
    const usuarioPerfil = usuarios[0];

    db.query(sqlPublicaciones, [id_usuario_visto], (err, publicaciones) => {
      if (err) return res.status(500).send('Error cargando publicaciones');

      db.query(sqlContadores, [id_usuario_visto, id_usuario_visto], (err, contadores) => {
        if (err) return res.status(500).send('Error cargando seguidores');
        const { seguidores, siguiendo } = contadores[0];

        if (!id_usuario_logueado || id_usuario_logueado === id_usuario_visto) {
          return res.render('perfil_publico', {
            usuarioPerfil,
            publicaciones,
            siguiendoYa: false,
            mostrarFollow: false,
            seguidores,
            siguiendo,
            usuario: req.session.usuario
          });
        }

        db.query(sqlFollowCheck, [id_usuario_logueado, id_usuario_visto], (err, resultado) => {
          if (err) return res.status(500).send('Error validando follow');

          res.render('perfil_publico', {
            usuarioPerfil,
            publicaciones,
            siguiendoYa: resultado.length > 0,
            mostrarFollow: true,
            seguidores,
            siguiendo,
            usuario: req.session.usuario
          });
        });
      });
    });
  });
};

// Seguir / Dejar de seguir
exports.toggleFollow = (req, res) => {
  const seguidor = req.session.usuario?.id;
  const seguido = parseInt(req.params.id);
  if (!seguidor || seguidor === seguido) return res.redirect('/');


  db.query(sqlExiste, [seguidor, seguido], (err, resultado) => {
    if (err) return res.status(500).send('Error al procesar follow');

    if (resultado.length > 0) {
      db.query(sqlDelete, [seguidor, seguido], () => res.redirect(`/usuario/${seguido}`));
    } else {
      db.query(sqlInsert, [seguidor, seguido], () => res.redirect(`/usuario/${seguido}`));
    }
  });
};
