'use strict'

var express = require('express');
var ClienteController = require('../controllers/clientes');
const userCtrl = require('../controllers/User')
const auth = require('../middlewares/authenticated');
var router = express.Router();

router.post('/cliente/guardar', ClienteController.nuevoCliente);
router.get('/clientes/:last?',  ClienteController.obtenerClientes);
router.delete('/clientes-delete/:id', ClienteController.eliminarCliente);
router.get('/cliente-search/:search', ClienteController.buscarCliente);
router.get('/cliente/:id', ClienteController.obtenerCliente);
router.post('signup/', userCtrl.signUp)
router.post('/signin', userCtrl.signIn)
router.post('/getClientes', userCtrl.getsesiones)
router.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
  })

module.exports = router;