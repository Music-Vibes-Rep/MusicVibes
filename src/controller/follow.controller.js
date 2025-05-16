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

const sqlUserGeneros = `
  SELECT g.Nombre FROM Genero_Musical g
  JOIN Usuario_Genero ug ON g.id_genero = ug.id_genero
  WHERE ug.id_usuario = ?
`;

const sqlUserInstrumentos = `
  SELECT i.Nombre FROM Instrumento i
  JOIN Usuario_Instrumento ui ON i.id_instrumento = ui.id_instrumento
  WHERE ui.id_usuario = ?
`;

exports.verPerfilPublico = (req, res) => {
  const id_usuario_visto = parseInt(req.params.id);
  const id_usuario_logueado = req.session.usuario?.id || null;

  if (!id_usuario_visto) {
    return res.render('error', {
      error: 'Usuario no válido.',
      redirectFeed: '/',
      redirectLogin: '/login'
    });
  }

  db.query(sqlUsuario, [id_usuario_visto], (err, usuarios) => {
    if (err || usuarios.length === 0) {
      return res.render('error', {
        error: 'Usuario no encontrado.',
        redirectFeed: '/',
        redirectLogin: '/login'
      });
    }

    const usuarioPerfil = usuarios[0];

    db.query(sqlUserGeneros, [id_usuario_visto], (err, generos) => {
      if (err) {
        return res.render('error', {
          error: 'Error obteniendo géneros.',
          redirectFeed: '/',
          redirectLogin: '/login'
        });
      }

      db.query(sqlUserInstrumentos, [id_usuario_visto], (err, instrumentos) => {
        if (err) {
          return res.render('error', {
            error: 'Error obteniendo instrumentos.',
            redirectFeed: '/',
            redirectLogin: '/login'
          });
        }

        usuarioPerfil.generos = generos.map(g => g.Nombre);
        usuarioPerfil.instrumentos = instrumentos.map(i => i.Nombre);

        db.query(sqlPublicaciones, [id_usuario_visto], (err, publicaciones) => {
          if (err) {
            return res.render('error', {
              error: 'Error cargando publicaciones del usuario.',
              redirectFeed: '/',
              redirectLogin: '/login'
            });
          }

          db.query(sqlContadores, [id_usuario_visto, id_usuario_visto], (err, contadores) => {
            if (err) {
              return res.render('error', {
                error: 'Error cargando la información de seguidores.',
                redirectFeed: '/',
                redirectLogin: '/login'
              });
            }

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
              if (err) {
                return res.render('error', {
                  error: 'Error al validar la información de seguimiento.',
                  redirectFeed: '/',
                  redirectLogin: '/login'
                });
              }

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
    });
  });
};

exports.toggleFollow = (req, res) => {
  const seguidor = req.session.usuario?.id;
  const seguido = parseInt(req.params.id);
  if (!seguidor || seguidor === seguido) return res.redirect('/');



  db.query(sqlExiste, [seguidor, seguido], (err, result) => {
    if (err) {
      return res.render('error', {
        error: 'Error al procesar la acción de seguir/dejar de seguir.',
        redirectFeed: '/feed',
        redirectPerfil: `/usuario/${seguido}`,
        redirectLogin: '/login'
      });
    }


    if (result.length > 0) {
      db.query(sqlDelete, [seguidor, seguido], (err2) => {
        if (err2) {
          return res.render('error', {
            error: 'Error al dejar de seguir al usuario.',
            redirectFeed: '/feed',
            redirectPerfil: `/usuario/${seguido}`,
            redirectLogin: '/login'
          });
        }
        return res.redirect(`/usuario/${seguido}`);
      });
    } else {
      db.query(sqlInsert, [seguidor, seguido], (err2) => {
        if (err2) {
          return res.render('error', {
            error: 'Error al seguir al usuario.',
            redirectFeed: '/feed',
            redirectPerfil: `/usuario/${seguido}`,
            redirectLogin: '/login'
          });
        }
        return res.redirect(`/usuario/${seguido}`);
      });
    }
  });
};

exports.getSeguidores = (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT u.id_usuario, u.Nombre, u.Apellido, u.foto_perfil
    FROM Follow f
    JOIN Usuario u ON f.seguidor = u.id_usuario
    WHERE f.seguido = ?
  `;
  db.query(sql, [id], (err, resultados) => {
    if (err) return res.render('error', { error: 'Error al obtener seguidores.', redirectFeed: '/' });
    res.render('seguidores_lista', { usuarios: resultados, titulo: 'Seguidores', usuario: req.session.usuario });
  });
};

exports.getSeguidos = (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT u.id_usuario, u.Nombre, u.Apellido, u.foto_perfil
    FROM Follow f
    JOIN Usuario u ON f.seguido = u.id_usuario
    WHERE f.seguidor = ?
  `;
  db.query(sql, [id], (err, resultados) => {
    if (err) return res.render('error', { error: 'Error al obtener seguidos.', redirectFeed: '/' });
    res.render('seguidores_lista', { usuarios: resultados, titulo: 'Siguiendo', usuario: req.session.usuario });
  });
};

