const express = require('express');
const router = express.Router();
const db = require('../modules/db/conection');

router.post('/like', (req, res) => {
  const id_usuario = req.session.usuario?.id;
  const id_publicacion = req.body.id_publicacion;

  if (!id_usuario) return res.redirect('/login');

  const checkSql = 'SELECT * FROM Like_Publicacion WHERE id_usuario = ? AND id_publicacion = ?';
  const insertSql = 'INSERT INTO Like_Publicacion (id_usuario, id_publicacion, fecha_like) VALUES (?, ?, NOW())';
  const deleteSql = 'DELETE FROM Like_Publicacion WHERE id_usuario = ? AND id_publicacion = ?';

  db.query(checkSql, [id_usuario, id_publicacion], (err, rows) => {
    if (err) return res.status(500).send('Error al verificar like');

    if (rows.length === 0) {
      // Dar like
      db.query(insertSql, [id_usuario, id_publicacion], () => res.redirect('back'));
    } else {
      // Quitar like
      db.query(deleteSql, [id_usuario, id_publicacion], () => res.redirect('back'));
    }
  });
});

module.exports = router;
