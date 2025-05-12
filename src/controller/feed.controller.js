const db = require("../modules/db/conection");

exports.getFeed = (req, res) => {
  const sqlPublicaciones = `
    SELECT p.id_publicacion, p.contenido, p.foto, p.fecha_publicacion,
           u.Nombre AS nombre_usuario, u.foto_perfil
    FROM Publicacion p
    JOIN Usuario u ON u.id_usuario = p.id_usuario
    ORDER BY fecha_publicacion DESC
  `;

  db.query(sqlPublicaciones, (err, publicaciones) => {
    if (err) {
      console.error("Error al obtener publicaciones:", err.message);
      return res.status(500).send("Error al cargar el feed");
    }

    const ids = publicaciones.map((p) => p.id_publicacion);
    if (ids.length === 0)
      return res.render("feed", {
        publicaciones: [],
        usuario: req.session.usuario,
      });

    const sqlComentarios = `
      SELECT c.id_publicacion, c.Comentario, c.fecha_comentario, u.Nombre AS nombre_usuario
      FROM Comentario c
      JOIN Usuario u ON c.id_usuario = u.id_usuario
      WHERE c.id_publicacion IN (?)
    `;

    db.query(sqlComentarios, [ids], (err, comentarios) => {
      if (err) {
        console.error("Error al obtener comentarios:", err.message);
        return res.status(500).send("Error al cargar comentarios");
      }

      const agrupados = {};
      comentarios.forEach((com) => {
        if (!agrupados[com.id_publicacion]) agrupados[com.id_publicacion] = [];
        agrupados[com.id_publicacion].push(com);
      });

      publicaciones.forEach((pub) => {
        pub.comentarios = agrupados[pub.id_publicacion] || [];
      });

      res.render("feed", { publicaciones, usuario: req.session.usuario });
    });
  });
};
