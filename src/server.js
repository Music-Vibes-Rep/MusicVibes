// src/server.js
const app = require('./app');

const PORT = 8082; 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

