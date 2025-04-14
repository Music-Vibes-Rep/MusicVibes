//importar conexion 

const express = require('express');
const conn = require('../db/conection');
const usuario = require('../db/objetosBD'); 
const app = express();
const PORT = 8080;
//guardar datos base de datos
app.use(express.urlencoded({ extended: true }));
/*
app.post('/guardar', (req, res) => {
  const { nombre, email ,apellido, password, es_musico} = req.body;
*/

usuario.nombre = "zawar";
usuario.email = "pruebota@gmail.com";
usuario.apellido = "prueba";
usuario.password = "123";
usuario.es_musico = "5";

  const sql = "INSERT INTO Usuario (nombre, email, apellido, password, es_musico) VALUES (?,?,?,?,?)";
  conn.query(sql, [usuario.nombre, usuario.email, usuario.apellido, usuario.password, usuario.es_musico], (err) => {
    if (err) {
      console.error('Error al guardar:', err.message);
      //res.send('Error al guardar');
      console.log('Error al guardar');
    } else {
      //res.send('Datos guardados con exito');
      console.log('Guardado exitosamente');
      conn.end((err) => {
        if (err) {
          console.error('Error al cerrar la conexion:', err.message);
        } else {
          console.log('Conexion cerrada');
        }
      });
    }

  });
  
//});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
 