'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaArticulo = Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    precio: Number,
    stock: Number
});

module.exports = mongoose.model('Articulo', SchemaArticulo);