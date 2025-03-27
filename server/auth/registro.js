//importar conexion 
var mysql = require('mysql2');
const express = require('express');
const conexion = require('../db/conection'); 
const app = express();
//guardar datos base de datos
app.use(express.urlencoded({ extended: true }));

app.post('/guardar', (req, res) => {
  const { nombre, email } = req.body;

  const sql = 'INSERT INTO Usuario (nombre, email) VALUES (ivan, prueba@gmail.com)';
  conexion.query(sql, [nombre, email], (err) => {
    if (err) {
      console.error('Error al guardar:', err.message);
      res.send('Error al guardar');
    } else {
      res.send('Datos guardados con exito');
      conexion.end((err) => {
        if (err) {
          console.error('Error al cerrar la conexion:', err.message);
        } else {
          console.log('Conexion cerrada');
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
 