/*
//importar conexion 

const express = require('express');
const conn = require('../db/conection');
const { usuario: usuarioPlantilla } = require('../db/objetosBD'); 
const bcrypt = require('bcrypt');
const app = express();
const PORT = 8080;
//guardar datos base de datos
app.use(express.urlencoded({ extended: true }));

app.post('/guardar', async (req, res) => {
  const { nombre, email ,apellido, password, es_musico} = req.body;

/*
usuario.nombre = "zawar";
usuario.email = "pruebota@gmail.com";
usuario.apellido = "prueba";
usuario.password = "123";
usuario.es_musico = "5";
*/

//QUEDA PENDIENTE HASHEAR PASSWORDS
/*
try {
  const hashedPassword = await bcrypt.hash(password, 10);

 
  const usuario = { ...usuarioPlantilla };

  usuario.nombre = nombre;
  usuario.apellido = apellido;
  usuario.email = email;
  usuario.password = hashedPassword;
  usuario.es_musico = es_musico;


  const sql = "INSERT INTO Usuario (nombre, email, apellido, password, es_musico) VALUES (?,?,?,?,?)";
  conn.query(sql, [usuario.nombre, usuario.email, usuario.apellido, usuario.password, usuario.es_musico], (err) => {
    if (err) {
      console.error('Error al guardar:', err.message);
      res.send('Error al guardar');
      console.log('Error al guardar');
    } else {
      res.send('Datos guardados con exito');
      console.log('Guardado exitosamente');
      
    }

});
} catch (error) {
  console.error('Error en registro:', error.message);
  res.status(500).send('Error en el servidor');
}
});

  

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
*/
const db = require('../db/conection');

const UserModel = {
  create: (usuario, callback) => {
    const sql = "INSERT INTO Usuario (nombre, email, apellido, password, es_musico) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [usuario.nombre, usuario.email, usuario.apellido, usuario.password, usuario.es_musico], callback);
  }
};

module.exports = UserModel;
