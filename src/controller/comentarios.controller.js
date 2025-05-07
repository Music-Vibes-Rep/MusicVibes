const { comentario: comentarioPlantilla, comentario } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');
const path = require('path');
//const authUser = require('../modules/auth/auth');
//queries
const guardar = "INSERT INTO Comentario (Comentario, id_usuario, id_publicacion) VALUES (?, ?, ?)";
const mostrar = "SELECT fecha_comentario, Comentario, id_usuario FROM Comentario WHERE Id_usuario = ?";

// Registrar comentarios
exports.registrarComentario = async (req, res) => {
  //if (!req.session.usuario || !req.session.usuario.id) return res.redirect('/login');

  const { contenido } = req.body;
  const id_usuario = req.session.usuario.id;

  try {
    const comentario = { ...comentarioPlantilla };
    comentario.comentario = comentario;
    comentario.id_publicacion = id_publicacion;
    comentario.id_usuario = id_usuario;

    db.query(guardar, [omentario.comentario, comentario.id_publicacion, comentario.id_usuario], (err) => {
      if (err) {
        console.error('Error para comentar', err.message);
        return res.status(500).send('Error al comentar la publicación');
      }
      res.redirect('/');
    });

  } catch (err) {
    console.error('Error interno del servidor:', err);
    res.status(500).send('Error interno del servidor');
  }
};

//mostraremos las publicaciones

exports.getComentario = (req, res) => {
  //if (!req.session.usuario.id) return res.redirect('/login');
  const id_usuario = req.usuario.id;
  db.query(mostrar, [id_usuario], (err) => {
    if (err){
      console.error('Error al obtener publicaciones: ', err.message);
      return res.status(500).send('Error al obtener publicaciones');
    }
    res.render('perfil',{
      publicaciones: results,
      usuario: req.session.usuario
    });

  });
};
