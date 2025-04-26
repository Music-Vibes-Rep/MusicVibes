const { publicacion: publicacionPlantilla } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');
const path = require('path');

const guardar = "INSERT INTO Publicacion (contenido, foto, id_usuario) VALUES (?, ?, ?)";

// Mostrar formulario
exports.getRegisterPublicacion = (req, res) => {
  if (!req.session.usuario || !req.session.usuario.id) return res.redirect('/login');
  res.render('publicacion', { id_usuario: req.session.usuario.id });
};

// Registrar publicación
exports.registrarPublicacion = async (req, res) => {
  if (!req.session.usuario || !req.session.usuario.id) return res.redirect('/login');

  const { contenido } = req.body;
  const id_usuario = req.session.usuario.id;
  const imagen = req.file ? `/public/assets/publicaciones/${req.file.filename}` : null;

  try {
    const publicacion = { ...publicacionPlantilla };
    publicacion.contenido = contenido;
    publicacion.foto = imagen;
    publicacion.id_usuario = id_usuario;

    db.query(guardar, [publicacion.contenido, publicacion.foto, publicacion.id_usuario], (err) => {
      if (err) {
        console.error('Error para guardar', err.message);
        return res.status(500).send('Error al guardar publicación');
      }
      res.redirect('/');
    });

  } catch (err) {
    console.error('Error interno del servidor:', err);
    res.status(500).send('Error interno del servidor');
  }
};
