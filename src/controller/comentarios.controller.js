const { comentario: comentarioPlantilla } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');
const path = require('path');

const guardar = "INSERT INTO Comentario (Comentario, id_usuario, id_publicacion) VALUES (?, ?, ?)";
const mostrar = "SELECT fecha_comentario, Comentario, id_usuario FROM Comentario WHERE id_usuario = ?";
const eliminar = 'DELETE FROM Comentario WHERE id_usuario = ?';


// Registrar comentarios
exports.registrarComentario = async (req, res) => {
  const { contenido, id_publicacion } = req.body;
  const id_usuario = req.session.usuario.id;

  try {
    const nuevoComentario = { ...comentarioPlantilla };
    nuevoComentario.comentario = contenido;
    nuevoComentario.id_publicacion = id_publicacion;
    nuevoComentario.id_usuario = id_usuario;

    db.query(guardar, [nuevoComentario.comentario, nuevoComentario.id_usuario, nuevoComentario.id_publicacion], (err) => {
      if (err) {
        console.error('Error para comentar:', err.message);
        return res.status(500).send('Error al comentar la publicación');
      }
      res.redirect('/feed');
    });

  } catch (err) {
    console.error('Error interno del servidor:', err);
    res.status(500).send('Error interno del servidor');
  }
};

//Eliminar comentarios
exports.eliminarComentario = (req,res) => {
  const id_usuario = req.session.usuario.id;

  if(!id_usuario){
    return res.redirect('/login');
  }  
  db.query(eliminar, [id_usuario], (err) => {
    if (err){
      console.error('Error al eliminar comentario', err.message);
      return res.status(500).send('Error al eliminar comentario');
    }
    /*
  req.session.destroy(() => {
    res.redirect('/');
    });
    */
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