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
  // Si no está logueado, redirigir al login
  if (!req.session.usuario) {
    return res.redirect('/login');
  }

  const usuario = req.session.usuario;
  const sql = 'SELECT * FROM Publicacion WHERE id_usuario = ? ORDER BY fecha_publicacion DESC';
  db.query(sql, [usuario.id], (err, publicaciones) => {
    if (err) {
      console.error('Error al obtener publicaciones:', err.message);
      return res.status(500).send('Error interno del servidor');
    }

    // Renderizar el perfil con las publicaciones
    res.render('perfil', { usuario, publicacion: publicaciones });
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
