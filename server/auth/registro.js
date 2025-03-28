//importar conexion 
var mysql = require('mysql2');
const express = require('express');
const conn = require('../db/conection'); 
const app = express();
const PORT = 8080;
//guardar datos base de datos
app.use(express.urlencoded({ extended: true }));
/*
app.post('/guardar', (req, res) => {
  const { nombre, email ,apellido, password, es_musico} = req.body;
*/

const nombre = "Ivan";
const email = "prueba@gmail.com";
const apellido = "prueba";
const password = "123";
const es_musico = "0";

  const sql = "INSERT INTO Usuario (nombre, email, apellido, password, es_musico) VALUES (?,?,?,?,?)";
  conn.query(sql, [nombre, email, apellido, password, es_musico], (err) => {
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
 