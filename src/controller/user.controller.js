const bcrypt = require('bcrypt');
const UserModel = require('../modules/auth/registro');
const { usuario: usuarioPlantilla } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');
const Swal = require('sweetalert2')

//queries

const sqlUser = `
    SELECT u.id_usuario, u.Nombre AS nombre, u.Apellido AS apellido, u.email, u.password,
           u.foto_perfil, u.descripcion, u.id_instrumento, u.id_provincia, u.es_musico,
           i.Nombre AS instrumento_nombre, p.Provincia AS provincia_nombre
    FROM Usuario u
    LEFT JOIN Instrumento i ON u.id_instrumento = i.id_instrumento
    LEFT JOIN Provincia p ON u.id_provincia = p.id_provincia
    WHERE u.id_usuario = ?
  `;

const sqlPub = 'SELECT * FROM Publicacion WHERE id_usuario = ? ORDER BY fecha_publicacion DESC';
const sqlInst = 'SELECT * FROM Instrumento';
const sqlProv = 'SELECT * FROM Provincia';

const sqlUsuario = `
    SELECT u.id_usuario, u.Nombre, u.Apellido, u.descripcion, u.foto_perfil,
           u.es_musico, i.Nombre AS instrumento, p.Provincia AS provincia
    FROM Usuario u
    LEFT JOIN Instrumento i ON u.id_instrumento = i.id_instrumento
    LEFT JOIN Provincia p ON u.id_provincia = p.id_provincia
    WHERE u.id_usuario = ?
  `;

const sqlPublicaciones = `
    SELECT * FROM Publicacion
    WHERE id_usuario = ? ORDER BY fecha_publicacion DESC
  `;

const sqlFollowCheck = `
    SELECT * FROM Follow WHERE seguidor = ? AND seguido = ?
  `;

const sqlContadores = `
    SELECT
      (SELECT COUNT(*) FROM Follow WHERE seguido = ?) AS seguidores,
      (SELECT COUNT(*) FROM Follow WHERE seguidor = ?) AS siguiendo
  `;

const sqlUserGeneros = `
  SELECT g.id_genero, g.Nombre
  FROM Genero_Musical g
  JOIN Usuario_Genero ug ON g.id_genero = ug.id_genero
  WHERE ug.id_usuario = ?
`;
const sqlUserInstrumentos = `
  SELECT i.id_instrumento, i.Nombre
  FROM Instrumento i
  JOIN Usuario_Instrumento ui ON i.id_instrumento = ui.id_instrumento
  WHERE ui.id_usuario = ?
`;

const sqlGeneros = 'SELECT * FROM Genero_Musical';

const sqlExiste = 'SELECT * FROM Follow WHERE seguidor = ? AND seguido = ?';
const sqlInsert = 'INSERT INTO Follow (seguidor, seguido) VALUES (?, ?)';
const sqlDelete = 'DELETE FROM Follow WHERE seguidor = ? AND seguido = ?';



// Mostrar formulario de registro
exports.getRegister = (req, res) => {
  if (req.session.usuario) return res.redirect('/');
  res.render('register');
};

// Política de privacidad
exports.getPrivacidad = (req, res) => {
  const usuario = req.session.usuario || null;
  res.render('privacity', { usuario });
};

// Login
exports.getLogin = (req, res) => {
  if (req.session.usuario) return res.redirect('/');
  res.render('login', { isRegister: false });
};

// Perfil propio del usuario
exports.getProfile = (req, res) => {
  if (!req.session.usuario) return res.redirect('/login');

  const id_usuario = req.session.usuario.id;

  db.query(sqlUser, [id_usuario], (err, resultUsuario) => {
    if (err || resultUsuario.length === 0) {
      console.error('Error al obtener usuario:', err?.message);
      return res.render('error', {
        error: 'Error al obtener usuario. Intenta de nuevo.',
        redirectFeed: '/',
        redirectLogin: '/login'
      });
    }

    const usuario = resultUsuario[0];

    db.query(sqlPub, [id_usuario], (err, publicaciones) => {
      if (err) {
        return res.render('error', {
          error: 'Error al obtener publicaciones. Intenta de nuevo.',
          redirectFeed: '/',
          redirectPerfil: '/perfil'
        });
      }

      db.query(sqlInst, (err, instrumentos) => {
        if (err) {
          return res.render('error', {
            error: 'Error al obtener instrumentos.',
            redirectFeed: '/',
            redirectPerfil: '/perfil'
          });
        }

        db.query(sqlProv, (err, provincias) => {
          if (err) {
            return res.render('error', {
              error: 'Error al obtener provincias.',
              redirectFeed: '/',
              redirectPerfil: '/perfil'
            });
          }

          db.query(sqlGeneros, (err, generos) => {
            if (err) {
              return res.render('error', {
                error: 'Error al obtener géneros.',
                redirectFeed: '/',
                redirectPerfil: '/perfil'
              });
            }

            db.query(sqlUserGeneros, [id_usuario], (err, generosUsuario) => {
              if (err) {
                return res.render('error', {
                  error: 'Error al obtener géneros del usuario.',
                  redirectFeed: '/',
                  redirectPerfil: '/perfil'
                });
              }

              db.query(sqlUserInstrumentos, [id_usuario], (err, instrumentosUsuario) => {
                if (err) {
                  return res.render('error', {
                    error: 'Error al obtener instrumentos del usuario.',
                    redirectFeed: '/',
                    redirectPerfil: '/perfil'
                  });
                }

                usuario.generos = generosUsuario;
                usuario.instrumentos = instrumentosUsuario;

                res.render('perfil', {
                  usuario,
                  publicacion: publicaciones,
                  instrumentos,
                  provincias,
                  generos
                });
              });
            });
          });
        });
      });
    });
  });
};


// Editar perfil
exports.editarPerfil = async (req, res) => {
  if (!req.session.usuario) return res.redirect('/login');

  const id_usuario = req.session.usuario.id;
  const { nombre, apellido, descripcion, id_provincia, es_musico } = req.body;

  const instrumentosSeleccionados = Array.isArray(req.body.instrumentos) ? req.body.instrumentos : [req.body.instrumentos].filter(Boolean);
  const generosSeleccionados = Array.isArray(req.body.generos) ? req.body.generos : [req.body.generos].filter(Boolean);
  const nuevaFoto = req.file ? '/assets/perfil/' + req.file.filename : req.session.usuario.foto_perfil;

  const sqlUpdateUsuario = `
    UPDATE Usuario SET Nombre = ?, Apellido = ?, descripcion = ?, foto_perfil = ?,
    id_provincia = ?, es_musico = ? WHERE id_usuario = ?
  `;

  db.query(sqlUpdateUsuario, [
    nombre,
    apellido,
    descripcion,
    nuevaFoto,
    id_provincia || null,
    parseInt(es_musico) || 0,
    id_usuario
  ], async (err) => {
    if (err) {
      console.error('Error al actualizar perfil base:', err.message);
      return res.render('error', {
        error: 'Error al actualizar el perfil.',
        redirectFeed: '/',
        redirectPerfil: '/perfil'
      });
    }

    await db.promise().query('DELETE FROM Usuario_Instrumento WHERE id_usuario = ?', [id_usuario]);
    await db.promise().query('DELETE FROM Usuario_Genero WHERE id_usuario = ?', [id_usuario]);

    for (const inst of instrumentosSeleccionados) {
      if (inst) {
        await db.promise().query('INSERT INTO Usuario_Instrumento (id_usuario, id_instrumento) VALUES (?, ?)', [id_usuario, inst]);
      }
    }

    for (const gen of generosSeleccionados) {
      if (gen) {
        await db.promise().query('INSERT INTO Usuario_Genero (id_usuario, id_genero) VALUES (?, ?)', [id_usuario, gen]);
      }
    }

    req.session.usuario = {
      ...req.session.usuario,
      nombre,
      apellido,
      descripcion,
      foto_perfil: nuevaFoto,
      id_provincia,
      es_musico: parseInt(es_musico)
    };

    res.redirect('/perfil');
  });
};

// Registro
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, apellido, password } = req.body;
  let es_musico = req.body.es_musico;
  if (Array.isArray(es_musico)) es_musico = es_musico.includes('1') ? 1 : 0;
  else es_musico = parseInt(es_musico) || 0;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = { ...usuarioPlantilla };

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.password = hashedPassword;
    usuario.es_musico = es_musico;

    UserModel.create(usuario, (err) => {
      //if (err) return res.status(500).send('Error al guardar');
      if (err) {
        return res.render('error', {
          error: 'Error al guardar el usuario. Es posible que el correo ya esté registrado o los datos sean inválidos.',
          redirectFeed: '/',
          redirectLogin: '/login',
          redirectRegistro: '/registro'
        });
      }
      res.render('registroExitoso', { nombre, email });

    });
  } catch (err) {
    //res.status(500).send('Error interno del servidor');
    res.render('error', {
      error: 'Error interno del servidor. Intenta más tarde.',
      redirectFeed: '/',
      redirectLogin: '/login',
      redirectRegistro: '/registro'
    });
  }
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
  const id_usuario = req.session.usuario?.id;
  if (!id_usuario) return res.redirect('/login');

  const sql = 'DELETE FROM Usuario WHERE id_usuario = ?';
  db.query(sql, [id_usuario], (err) => {
    if (err) {
      console.error('Error al eliminar cuenta:', err?.message);
      return res.render('error', {
        error: 'Error al eliminar tu cuenta. Por favor, intenta de nuevo más tarde.',
        redirectFeed: '/',
        redirectLogin: '/login'
      });
    }
    req.session.destroy(() => res.redirect('/'));
  });
};

// Login
exports.loginUsuario = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM Usuario WHERE email = ? LIMIT 1';

  db.query(sql, [email], async (err, results) => {
    //if (err || results.length === 0) return res.status(401).send('Usuario no encontrado');
    if (err || results.length === 0) {
      return res.render('error', {
        error: 'Usuario no encontrado',
        redirectFeed: '/',
        redirectLogin: '/login'
      });
    }

    const usuario = results[0];
    const match = await bcrypt.compare(password, usuario.password);
    //if (!match) return res.status(401).send('Contraseña incorrecta');
    if (!match) {
      return res.render('error', {
        error: 'Contraseña incorrecta',
        redirectFeed: '/',
        redirectLogin: '/login'
      });
    }

    req.session.usuario = {
      id: usuario.id_usuario,
      nombre: usuario.Nombre,
      apellido: usuario.Apellido,
      email: usuario.email,
      es_musico: usuario.es_musico,
      foto_perfil: usuario.foto_perfil,
      descripcion: usuario.descripcion,
      id_instrumento: usuario.id_instrumento,
      id_provincia: usuario.id_provincia
    };

    res.redirect('/');
  });
};

// Logout
exports.logoutUsuario = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

// Ver perfil público
exports.verPerfilPublico = (req, res) => {
  const id_usuario_visto = parseInt(req.params.id);
  const id_usuario_logueado = req.session.usuario?.id || null;

  //if (!id_usuario_visto) return res.status(404).send('Usuario no válido');
  if (!id_usuario_visto) {
  return res.render('error', {
    error: 'Usuario no válido',
    redirectFeed: '/',
    redirectLogin: '/login'
  });
}

  db.query(sqlUsuario, [id_usuario_visto], (err, usuarios) => {
    //if (err || usuarios.length === 0) return res.status(404).send('Usuario no encontrado');
    if (err || usuarios.length === 0) {
    return res.render('error', {
      error: 'Usuario no encontrado',
      redirectFeed: '/',
      redirectLogin: '/login'
    });
  }
    const usuarioPerfil = usuarios[0];

    db.query(sqlPublicaciones, [id_usuario_visto], (err, publicaciones) => {
      //if (err) return res.status(500).send('Error cargando publicaciones');
      if (err || usuarios.length === 0) {
        return res.render('error', {
          error: 'Error cargando publicaciones',
          redirectFeed: '/',
          redirectLogin: '/login'
        });
      }

      db.query(sqlContadores, [id_usuario_visto, id_usuario_visto], (err, contadores) => {
        //if (err) return res.status(500).send('Error cargando seguidores');
        if (contadores.length === 0) {
          return res.render('error', {
            error: 'Error cargando seguidores',
            redirectFeed: '/',
            redirectLogin: '/login'
          });
        }
        const { seguidores, siguiendo } = contadores[0];

        if (!id_usuario_logueado || id_usuario_logueado === id_usuario_visto) {
          return res.render('perfil_publico', {
            usuarioPerfil,
            publicaciones,
            siguiendoYa: false,
            mostrarFollow: false,
            seguidores,
            siguiendo,
            usuario: req.session.usuario
          });
        }

        db.query(sqlFollowCheck, [id_usuario_logueado, id_usuario_visto], (err, resultado) => {
          //if (err) return res.status(500).send('Error validando follow');
          if (err) {
            return res.render('error', {
              error: 'Error validando follow',
              redirectFeed: '/',
              redirectLogin: '/login'
            });
          }

          res.render('perfil_publico', {
            usuarioPerfil,
            publicaciones,
            siguiendoYa: resultado.length > 0,
            mostrarFollow: true,
            seguidores,
            siguiendo,
            usuario: req.session.usuario
          });
        });
      });
    });
  });
};

// Seguir / Dejar de seguir
exports.toggleFollow = (req, res) => {
  const seguidor = req.session.usuario?.id;
  const seguido = parseInt(req.params.id);
  if (!seguidor || seguidor === seguido) return res.redirect('/');


  db.query(sqlExiste, [seguidor, seguido], (err, resultado) => {
    //if (err) return res.status(500).send('Error al procesar follow');
    if (err) {
      return res.render('error', {
        error: 'Error al procesar follow',
        redirectFeed: '/',
        redirectLogin: '/login'
      });
    }

    if (resultado.length > 0) {
      db.query(sqlDelete, [seguidor, seguido], () => res.redirect(`/usuario/${seguido}`));
    } else {
      db.query(sqlInsert, [seguidor, seguido], () => res.redirect(`/usuario/${seguido}`));
    }
  });
};
