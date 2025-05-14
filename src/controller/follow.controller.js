// src/controller/follow.controller.js
const db = require('../modules/db/conection');

//queries
const sqlInsert = 'INSERT INTO Follow (seguidor, seguido) VALUES (?, ?)';
const sqlDelete = 'DELETE FROM Follow WHERE seguidor = ? AND seguido = ?';

const sqlExiste = 'SELECT * FROM Follow WHERE seguidor = ? AND seguido = ?';
const sqlUsuario = `SELECT u.id_usuario, u.Nombre, u.Apellido, u.descripcion, u.foto_perfil,
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
