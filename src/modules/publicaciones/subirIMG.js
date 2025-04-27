const multer = require('multer');
const path = require('path');

// Configuramos dónde se guardan las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/assets/publicaciones');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtrar para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (.jpg, .jpeg, .png, .gif)')); 
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
