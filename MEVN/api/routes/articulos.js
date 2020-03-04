'use strict'

var express = require('express');
var ControladorArticulos = require('../controllers/articulos');

var router = express.Router();
var multi = require('connect-multiparty');
var md_upload = multi({uploadDir:'./upload'});

router.post('/guardar', ControladorArticulos.guardarArticulo);
router.get('/articulos/:last?', ControladorArticulos.obtenerArticulos);
router.get('/articulo/:id', ControladorArticulos.obtenerArticulo);
router.put('/articulo/:id', md_upload, ControladorArticulos.editarArticulo);
router.delete('/articulo/:id', ControladorArticulos.eliminarArticulo);
router.post('/upload-imagen/:id', md_upload, ControladorArticulos.upload);
router.get('/get-imagen/:imagen', ControladorArticulos.obtenerImagen);
router.get('/buscar/:buscar', ControladorArticulos.buscar);

module.exports = router;
