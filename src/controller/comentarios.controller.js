const db = require('../modules/db/conection');

// Registrar comentario
exports.registrarComentario = (req, res) => {
  const { contenido, id_publicacion } = req.body;
  const id_usuario = req.session.usuario?.id;

  if (!id_usuario) return res.status(401).json({ error: 'No autenticado' });

  const insertar = `
    INSERT INTO Comentario (Comentario, id_usuario, id_publicacion)
    VALUES (?, ?, ?)
  `;

  db.query(insertar, [contenido, id_usuario, id_publicacion], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al comentar' });

    const id_comentario = result.insertId;

    const obtener = `
      SELECT c.*, u.Nombre AS nombre_usuario, u.foto_perfil
      FROM Comentario c
      JOIN Usuario u ON u.id_usuario = c.id_usuario
      WHERE c.id_comentario = ?
    `;


    db.query(obtener, [id_comentario], (err2, rows) => {
      if (err2 || rows.length === 0) {
        return res.status(500).json({ error: 'Error al devolver comentario' });
      }

      res.json(rows[0]);
    });
  });
};

// Eliminar comentario
exports.eliminarComentario = (req, res) => {
  const { id_comentario } = req.body;
  const id_usuario = req.session.usuario?.id;

  if (!id_usuario) return res.status(401).json({ error: 'No autenticado' });

  const sql = 'DELETE FROM Comentario WHERE id_comentario = ? AND id_usuario = ?';
  db.query(sql, [id_comentario, id_usuario], (err) => {
    if (err) {
      console.error('Error al eliminar comentario:', err.message);
      return res.status(500).json({ error: 'Error al eliminar comentario' });
    }
    res.json({ success: true });
  });
};
