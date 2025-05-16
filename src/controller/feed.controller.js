const db = require('../modules/db/conection');

exports.getFeed = (req, res) => {
  const sqlPublicaciones = `
    SELECT p.id_publicacion, p.contenido, p.foto, p.fecha_publicacion,
           p.id_usuario, u.Nombre AS nombre_usuario, u.foto_perfil
    FROM Publicacion p
    JOIN Usuario u ON u.id_usuario = p.id_usuario
    ORDER BY fecha_publicacion DESC
  `;

  db.query(sqlPublicaciones, (err, publicaciones) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err.message);
      return res.render('error', {
        error: 'Error al cargar el feed. Por favor, inténtalo de nuevo.',
        redirectFeed: '/',
        redirectLogin: '/login'
      });
    }

    const ids = publicaciones.map(p => p.id_publicacion);
    if (ids.length === 0) return res.render('feed', { publicaciones: [], usuario: req.session.usuario });

    const sqlComentarios = `
      SELECT c.id_comentario, c.id_publicacion, c.Comentario, c.fecha_comentario, c.id_usuario, u.Nombre AS nombre_usuario
      FROM Comentario c
      JOIN Usuario u ON c.id_usuario = u.id_usuario
      WHERE c.id_publicacion IN (?)
    `;

    db.query(sqlComentarios, [ids], (err, comentarios) => {
      if (err) {
        console.error('Error al obtener comentarios:', err.message);
        return res.render('error', {
          error: 'Error al cargar los comentarios. Por favor, inténtalo de nuevo.',
          redirectFeed: '/',
          redirectLogin: '/login'
        });
      }

// sistema de likes                                                                                      
      const sqlLikes = `
        SELECT id_publicacion, id_usuario FROM Like_Publicacion
        WHERE id_publicacion IN (?)
      `;

      db.query(sqlLikes, [ids], (err, likes) => {
        if (err) {
          console.error('Error al obtener likes:', err.message);
          return res.render('error', {
            error: 'Error al cargar los likes. Por favor, inténtalo de nuevo.',
            redirectFeed: '/',
            redirectLogin: '/login'
          });
        }

        const agrupadosComentarios = {};
        comentarios.forEach(com => {
          if (!agrupadosComentarios[com.id_publicacion]) agrupadosComentarios[com.id_publicacion] = [];
          agrupadosComentarios[com.id_publicacion].push(com);
        });

        const agrupadosLikes = {};
        likes.forEach(like => {
          if (!agrupadosLikes[like.id_publicacion]) agrupadosLikes[like.id_publicacion] = [];
          agrupadosLikes[like.id_publicacion].push(like.id_usuario);
        });

        publicaciones.forEach(pub => {
          pub.comentarios = agrupadosComentarios[pub.id_publicacion] || [];
          pub.totalLikes = agrupadosLikes[pub.id_publicacion]?.length || 0;
          pub.usuarioDioLike = req.session.usuario
            ? agrupadosLikes[pub.id_publicacion]?.includes(req.session.usuario.id)
            : false;
        });

        res.render('feed', {
          publicaciones,
          usuarios: [],
          usuario: req.session.usuario,
          tipoQuery: '',
          qry: ''
        });
      });
    });
  });
};
