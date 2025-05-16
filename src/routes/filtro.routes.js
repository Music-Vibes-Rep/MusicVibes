//filtrar rutas

const express = require('express');
const router = express.Router();
const filtro = require('../controller/filtrar.controller');

router.get('/filtrar', filtro.filtrar);

module.exports = router;