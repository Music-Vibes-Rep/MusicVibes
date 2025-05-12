const bcrypt = require('bcrypt');
const UserModel = require('../modules/auth/registro');
const { usuario: usuarioPlantilla, publicacion } = require('../modules/db/objetosBD');
const db = require('../modules/db/conection');

// Renderizar formulario de registro
exports.getRegister = (req, res) => {
  if (req.session.usuario) return res.redirect('/');
  res.render('register');
};

// Renderizar politica de privacidad
exports.getPrivacidad = (req, res) => {
  const usuario = req.session.usuario || null;
  res.render('privacity', { usuario });
};


// Renderizar formulario de login
exports.getLogin = (req, res) => {
  if (req.session.usuario) return res.redirect('/');
  res.render('login', { isRegister: false });
};

// Mostrar perfil de usuario
exports.getProfile = (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }

  const id_usuario = req.session.usuario.id;

  const sqlUser = `
    SELECT 
      u.id_usuario,
      u.Nombre AS nombre,
      u.Apellido AS apellido,
      u.email,
      u.password,
      u.foto_perfil,
      u.descripcion,
      u.id_instrumento,
      u.id_provincia,
      u.es_musico,
      i.Nombre AS instrumento_nombre,
      p.Provincia AS provincia_nombre
    FROM Usuario u
    LEFT JOIN Instrumento i ON u.id_instrumento = i.id_instrumento
    LEFT JOIN Provincia p ON u.id_provincia = p.id_provincia
    WHERE u.id_usuario = ?
  `;

  const sqlPub = 'SELECT * FROM Publicacion WHERE id_usuario = ? ORDER BY fecha_publicacion DESC';
  const sqlInst = 'SELECT * FROM Instrumento';
  const sqlProv = 'SELECT * FROM Provincia';

  db.query(sqlUser, [id_usuario], (err, resultUsuario) => {
    if (err || resultUsuario.length === 0) {
      console.error('Error al obtener usuario:', err?.message);
      return res.status(500).send('Error al obtener usuario');
    }

    const usuario = resultUsuario[0];

    db.query(sqlPub, [id_usuario], (err, publicaciones) => {
      if (err) {
        console.error('Error al obtener publicaciones:', err.message);
        return res.status(500).send('Error al obtener publicaciones');
      }

      db.query(sqlInst, (err, instrumentos) => {
        if (err) {
          console.error('Error al obtener instrumentos:', err.message);
          return res.status(500).send('Error al obtener instrumentos');
        }

        db.query(sqlProv, (err, provincias) => {
          if (err) {
            console.error('Error al obtener provincias:', err.message);
            return res.status(500).send('Error al obtener provincias');
          }

          res.render('perfil', {
            usuario,
            publicacion: publicaciones,
            instrumentos,
            provincias
          });
        });
      });
    });
  });
};



exports.editarPerfil = (req, res) => {
  if (!req.session.usuario) return res.redirect('/login');

  const id_usuario = req.session.usuario.id;
  const { nombre, apellido, descripcion, id_instrumento, id_provincia } = req.body;

  let foto_perfil = req.session.usuario.foto_perfil;

  if (req.file) {
    foto_perfil = '/assets/perfil/' + req.file.filename;
  }

  const sql = `
    UPDATE Usuario 
    SET Nombre = ?, Apellido = ?, descripcion = ?, foto_perfil = ?, id_instrumento = ?, id_provincia = ?
    WHERE id_usuario = ?
  `;

  db.query(sql, [nombre, apellido, descripcion, foto_perfil, id_instrumento || null, id_provincia || null, id_usuario], (err) => {
    if (err) {
      console.error('Error al actualizar perfil:', err.message);
      return res.status(500).send('Error al actualizar perfil');
    }

    // Actualizar los datos en sesión
    req.session.usuario.nombre = nombre;
    req.session.usuario.apellido = apellido;
    req.session.usuario.descripcion = descripcion;
    req.session.usuario.foto_perfil = foto_perfil;
    req.session.usuario.id_instrumento = id_instrumento;
    req.session.usuario.id_provincia = id_provincia;

    res.redirect('/perfil');
  });
};


// Guardar un nuevo usuario, usamos asincronia porque bcrypt necesita asincronia si o si
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, apellido, password } = req.body;
  let es_musico = req.body.es_musico;

  if (Array.isArray(es_musico)) {
    es_musico = es_musico.includes('1') ? 1 : 0;
  } else {
    es_musico = parseInt(es_musico) || 0;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = { ...usuarioPlantilla };
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.password = hashedPassword;
    usuario.es_musico = es_musico;

    UserModel.create(usuario, (err) => {
      if (err) return res.status(500).send('Error al guardar');
      res.redirect('/login');
    });
  } catch (err) {
    res.status(500).send('Error interno del servidor');
  }
};

//Eliminar usuario
exports.eliminarUsuario = (req,res) => {
  const id_usuario = req.session.usuario.id;

  if(!id_usuario){
    return res.redirect('/login');
  }
    const sql = 'DELETE FROM Usuario WHERE id_usuario = ?';
  
  db.query(sql, [id_usuario], (err) => {
    if (err){
      console.error('Error al eliminar usuairio', err.message);
      return res.status(500).send('Error al eliminar cuneta');
    }
  req.session.destroy(() => {
    res.redirect('/');
    });
  });
};

// Login de usuario
exports.loginUsuario = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM Usuario WHERE email = ? LIMIT 1';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }

    const usuario = results[0];
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Guardar datos en la sesión
    req.session.usuario = {
      id: usuario.id_usuario,
      nombre: usuario.Nombre,
      apellido: usuario.Apellido,
      email: usuario.email,
      es_musico: usuario.es_musico
    };
    
    res.redirect('/');
  });
};

// Logout de usuario
exports.logoutUsuario = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
