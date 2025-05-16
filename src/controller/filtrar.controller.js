//redireccion de filtros

const filtros = require('../modules/publicaciones/filtros');
const db = require('../modules/db/conection');


function getComentariosYLikes(publicaciones, usuario, callback) {
  const ids = publicaciones.map(p => p.id_publicacion);
  if (ids.length === 0) return callback(publicaciones);
    //recupera los comentarios
  const sqlComentarios = `
    SELECT c.id_comentario, c.id_publicacion, c.Comentario, c.fecha_comentario, c.id_usuario, u.Nombre AS nombre_usuario
    FROM Comentario c
    JOIN Usuario u ON c.id_usuario = u.id_usuario
    WHERE c.id_publicacion IN (?)
  `;

  db.query(sqlComentarios, [ids], (err, comentarios) => {
    if (err) return callback(publicaciones); 
    //recupera los likes
    const sqlLikes = `
      SELECT id_publicacion, id_usuario FROM Like_Publicacion
      WHERE id_publicacion IN (?)
    `;

    db.query(sqlLikes, [ids], (err2, likes) => {
      if (err2) return callback(publicaciones);

      //
      const agrupadosComentarios = {};
      comentarios.forEach(com => {
        if (!agrupadosComentarios[com.id_publicacion]) agrupadosComentarios[com.id_publicacion] = [];
        agrupadosComentarios[com.id_publicacion].push(com);
      });

      // Agrupar likes por publicación
      const agrupadosLikes = {};
      likes.forEach(like => {
        if (!agrupadosLikes[like.id_publicacion]) agrupadosLikes[like.id_publicacion] = [];
        agrupadosLikes[like.id_publicacion].push(like.id_usuario);
      });

      // Insertar datos extra a cada publicación
      publicaciones.forEach(pub => {
        pub.comentarios = agrupadosComentarios[pub.id_publicacion] || [];
        pub.totalLikes = agrupadosLikes[pub.id_publicacion]?.length || 0;
        pub.usuarioDioLike = usuario
          ? agrupadosLikes[pub.id_publicacion]?.includes(usuario.id)
          : false;
      });

      callback(publicaciones);
    });
  });
}

exports.filtrar = (req, res) => {
  const tipo = req.query.tipoQuery || 'usuarios';
  const qry = req.query.qry || '';
  const params = req.query;

  if (!filtros[tipo]) return res.redirect('/feed');

  if (tipo === 'publicaciones') {
    filtros.publicaciones(db, params, (err, resultados) => {
      if (err) {
        return res.render('error', {
          error: 'Error al buscar publicaciones',
          redirectFeed: '/'
        });
      }

      getComentariosYLikes(resultados, req.session.usuario, (publicacionesConDatos) => {
        res.render('feed', {
          publicaciones: publicacionesConDatos,
          usuarios: [],
          usuario: req.session.usuario,
          tipoQuery: tipo,
          qry
        });
      });
    });
  } else {
    filtros[tipo](db, params, (err, resultados) => {
      if (err) {
        return res.render('error', {
          error: 'Error al aplicar el filtro',
          redirectFeed: '/'
        });
      }

      res.render('feed', {
        publicaciones: [],
        usuarios: resultados,
        usuario: req.session.usuario,
        tipoQuery: tipo,
        qry
      });
    });
  }
};

