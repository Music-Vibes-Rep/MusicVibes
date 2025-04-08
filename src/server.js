// src/server.js
const app = require('./app'); // Importa la aplicación Express desde el archivo app.js

const PORT = 8080; // Define el puerto en el que el servidor escuchará

// Inicia el servidor para escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
