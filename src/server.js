// src/server.js
const app = require('./app'); // Importa la aplicación Express desde el archivo app.js

const PORT = 8082; // cambia a 8082 o 3000 por ejemplo
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

