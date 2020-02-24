'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var UserController = require('../controllers/User');
// Llamamos al router
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.put('/signup', md_auth.ensureAuth, UserController.signUp);
// Exportamos la configuración
module.exports = api;