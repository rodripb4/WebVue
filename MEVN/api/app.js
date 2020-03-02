'use strict'
//cargar modulos de node  para crear el sevidor
var express = require('express');
var bodyParser =require('body-parser');


//Ejecurar express (http)
var app = express();

//Cargar ficheros rutas
var articulo_router = require('./routes/articulos');
var cliente_router = require('./routes/clientes');

//Midelwares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Añadir prefijos a rutas /cargar rutas
app.use('/',articulo_router);
app.use('/',cliente_router);
// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;