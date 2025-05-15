const { publicacion: publicacionPlantilla } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

//queries
const sqlSelect = 'SELECT foto FROM Publicacion WHERE id_publicacion = ? AND id_usuario = ?';
const sqlUpdate = 'UPDATE Publicacion SET contenido = ?, foto = ? WHERE id_publicacion = ? AND id_usuario = ?';

// Crear nueva publicacion
exports.registrarPublicacion = async (req, res) => {
  const { contenido } = req.body;
  const id_usuario = req.session.usuario.id;
  const imagen = req.file ? `/assets/publicaciones/${req.file.filename}` : null;

  const contenidoSanitizado = sanitizeHtml(contenido, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'iframe'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen']
    },
    allowIframeRelativeUrls: true,
    allowedSchemes: ['http', 'https']
  });

  const publicacion = { ...publicacionPlantilla };
  publicacion.contenido = contenidoSanitizado;
  publicacion.foto = imagen;
  publicacion.id_usuario = id_usuario;

  const sql = "INSERT INTO Publicacion (contenido, foto, id_usuario) VALUES (?, ?, ?)";
  db.query(sql, [publicacion.contenido, publicacion.foto, publicacion.id_usuario], (err) => {
    if (err) {
      console.error('Error al guardar publicación:', err.message);
      return res.render('error', {
        error: 'Error al guardar la publicación. Por favor, inténtalo de nuevo.',
        redirectFeed: '/feed',
        redirectPerfil: '/perfil'
      });
    }

    res.redirect('/feed');
  });
};

// Renderizar formulario de publicacion (nuevo)
exports.getRegisterPublicacion = (req, res) => {
  res.render('publicacion', { publicacion: null });
};

// Renderizar formulario para editar publis
exports.getEditarPublicacion = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Publicacion WHERE id_publicacion = ? AND id_usuario = ?';

  db.query(sql, [id, req.session.usuario.id], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error al buscar publicación para editar:', err?.message);
      return res.render('error', {
        error: 'Publicación no encontrada o no tienes permisos para editarla.',
        redirectFeed: '/feed',
        redirectPerfil: '/perfil'
      });
    }
    
    res.render('publicacion', { publicacion: results[0] });
  });
};

// Guardar cambios al editar publis
exports.editarPublicacion = (req, res) => {
  const { id } = req.params;
  const { contenido, quitarImagen } = req.body;
  const nuevaImagen = req.file ? `/assets/publicaciones/${req.file.filename}` : null;



  db.query(sqlSelect, [id, req.session.usuario.id], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error al obtener publicación:', err?.message);
      return res.render('error', {
        error: 'Publicación no encontrada o no tienes permisos para editarla.',
        redirectFeed: '/feed',
        redirectPerfil: '/perfil'
      });
    }


    let fotoFinal = results[0].foto;

    if (quitarImagen) {
      fotoFinal = null;
    } else if (nuevaImagen) {
      fotoFinal = nuevaImagen;
    }

    const contenidoSanitizado = sanitizeHtml(contenido, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'iframe'],
      allowedAttributes: {
        a: ['href', 'target', 'rel'],
        iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen']
      },
      allowIframeRelativeUrls: true,
      allowedSchemes: ['http', 'https']
    });

    db.query(sqlUpdate, [contenidoSanitizado, fotoFinal, id, req.session.usuario.id], (err) => {
      if (err) {
        console.error('Error al actualizar publicación:', err.message);
        return res.render('error', {
          error: 'Error al actualizar la publicación. Por favor, inténtalo de nuevo.',
          redirectFeed: '/feed',
          redirectPerfil: '/perfil'
        });
      }


      res.redirect('/feed');
    });
  });
};

// Eliminar publicaciones
exports.eliminarPublicacion = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Publicacion WHERE id_publicacion = ? AND id_usuario = ?';

  db.query(sql, [id, req.session.usuario.id], (err) => {
    if (err) {
      console.error('Error al eliminar publicación:', err.message);
      return res.render('error', {
        error: 'Error al eliminar la publicación. Por favor, inténtalo de nuevo.',
        redirectFeed: '/feed',
        redirectPerfil: '/perfil'
      });
    }

    res.redirect('/feed');
  });
};
