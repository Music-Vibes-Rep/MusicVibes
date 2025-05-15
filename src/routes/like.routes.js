const express = require('express');
const router = express.Router();
const db = require('../modules/db/conection');

router.post('/like', express.json(), (req, res) => {
  const id_usuario = req.session.usuario?.id;
  const id_publicacion = parseInt(req.body.id_publicacion);

  if (!id_usuario) return res.status(401).json({ error: 'No autenticado' });
  if (!id_publicacion) return res.status(400).json({ error: 'ID inválido' });

  const checkSql = 'SELECT * FROM Like_Publicacion WHERE id_usuario = ? AND id_publicacion = ?';
  const insertSql = 'INSERT INTO Like_Publicacion (id_usuario, id_publicacion, fecha_like) VALUES (?, ?, NOW())';
  const deleteSql = 'DELETE FROM Like_Publicacion WHERE id_usuario = ? AND id_publicacion = ?';

  db.query(checkSql, [id_usuario, id_publicacion], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al verificar like' });

    if (rows.length === 0) {
      db.query(insertSql, [id_usuario, id_publicacion], (err) => {
        if (err) return res.status(500).json({ error: 'Error al dar like' });
        return res.json({ liked: true });
      });
    } else {
      db.query(deleteSql, [id_usuario, id_publicacion], (err) => {
        if (err) return res.status(500).json({ error: 'Error al quitar like' });
        return res.json({ liked: false });
      });
    }
  });
});

module.exports = router;
