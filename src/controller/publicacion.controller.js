const { publicacion: publicacionPlantilla } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');
const path = require('path');

const guardar = "INSERT INTO Publicacion (contenido, foto, id_usuario) VALUES (?, ?, ?)";
const mostrar = "SELECT fecha_publicacion, contenido, foto FROM Publicacion WHERE Id_usuario = ?";

// Mostrar formulario
exports.getRegisterPublicacion = (req, res) => {
  res.render('publicacion', { id_usuario: req.session.usuario.id });
};

// Registrar publicación
exports.registrarPublicacion = async (req, res) => {
  const { contenido } = req.body;
  const id_usuario = req.session.usuario.id;
  const imagen = req.file ? `/assets/publicaciones/${req.file.filename}` : null;

  try {
    const publicacion = { ...publicacionPlantilla };
    publicacion.contenido = contenido;
    publicacion.foto = imagen;
    publicacion.id_usuario = id_usuario;

    db.query(guardar, [publicacion.contenido, publicacion.foto, publicacion.id_usuario], (err) => {
      if (err) {
        console.error('Error al guardar publicación:', err.message);
        return res.status(500).send('Error al guardar publicación');
      }
      res.redirect('/');
    });
  } catch (err) {
    console.error('Error interno del servidor:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Mostrar publicaciones del perfil
exports.getPublicacion = (req, res) => {
  const id_usuario = req.usuario.id;
  db.query(mostrar, [id_usuario], (err, results) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err.message);
      return res.status(500).send('Error al obtener publicaciones');
    }
    res.render('perfil', {
      publicaciones: results,
      usuario: req.session.usuario
    });
  });
};
