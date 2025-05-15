const { comentario: comentarioPlantilla } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');
const path = require('path');

const guardar = "INSERT INTO Comentario (Comentario, id_usuario, id_publicacion) VALUES (?, ?, ?)";
const mostrar = "SELECT fecha_comentario, Comentario, id_usuario FROM Comentario WHERE id_usuario = ?";
const eliminar = 'DELETE FROM Comentario WHERE id_usuario = ?';


// Registrar comentarios
exports.registrarComentario = async (req, res) => {
  const { contenido, id_publicacion } = req.body;
  const id_usuario = req.session.usuario?.id;

  if (!id_usuario) return res.status(401).json({ error: 'No autenticado' });

  const sql = `
    INSERT INTO Comentario (Comentario, id_usuario, id_publicacion)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [contenido, id_usuario, id_publicacion], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al comentar' });

    const id_comentario = result.insertId;
    const sqlObtener = `
      SELECT c.*, u.Nombre AS nombre_usuario
      FROM Comentario c
      JOIN Usuario u ON c.id_usuario = u.id_usuario
      WHERE c.id_comentario = ?
    `;

    db.query(sqlObtener, [id_comentario], (err2, rows) => {
      if (err2 || rows.length === 0) return res.status(500).json({ error: 'Error al devolver comentario' });

      res.json(rows[0]);
    });
  });
}

//Eliminar comentarios
exports.eliminarComentario = (req, res) => {
  const { id_comentario } = req.body;
  const id_usuario = req.session.usuario.id;

  const sql = 'DELETE FROM Comentario WHERE id_comentario = ? AND id_usuario = ?';

  db.query(sql, [id_comentario, id_usuario], (err) => {
    if (err) {
      console.error('Error al eliminar comentario:', err.message);
      return res.status(500).send('Error al eliminar comentario');
    }
    res.redirect('/feed');
  });
};


// Mostrar comentarios
exports.getComentario = (req, res) => {
  const id_usuario = req.session.usuario.id;

  db.query(mostrar, [id_usuario], (err, results) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err.message);
      return res.status(500).send('Error al obtener publicaciones');
    }

    res.render('perfil', {
      comentario: results,
      usuario: req.session.usuario
    });
  });
};