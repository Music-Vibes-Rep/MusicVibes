const db = require('../modules/db/conection');

exports.getFeed = (req, res) => {
  const sql = `
    SELECT p.id_publicacion, p.contenido, p.foto, p.fecha_publicacion,
           u.Nombre AS nombre_usuario, u.foto_perfil
    FROM Publicacion p
    JOIN Usuario u ON u.id_usuario = p.id_usuario
    ORDER BY RAND()
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err.message);
      return res.status(500).send('Error al cargar el feed');
    }

    res.render('feed', { publicaciones: results, usuario: req.session.usuario });
  });
};
