var validator = require('validator');
var Cliente = require('../models/clientes');
const User = require('../models/user')
var fs = require('fs');
var path = require('path');

const service = require('../service');

var controller = {

     //CREAR NUEVO CLIENTE

     nuevoCliente: (req, res) => {

        //recoger parametros por post 
        var params = req.body;
        var validate_email = !validator.isEmpty(params.email);
        var validate_password = !validator.isEmpty(params.password);
        console.log(params);

        //VALIDAR DATOS
        try {
            var validateNombre = !validator.isEmpty(params.nombre);
            var validate_apellido = !validator.isEmpty(params.apellido);
            var validate_telefono = !validator.isEmpty(params.telefono);
            var validate_direccion = !validator.isEmpty(params.direccion);
            var validate_email = !validator.isEmpty(params.email);
            var validate_dni = !validator.isEmpty(params.dni);
            var validate_password = !validator.isEmpty(params.password);
            var validate_rol = !validator.isEmpty(params.rol)
        } catch (err) {
          
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'
            });
        }

        if (validateNombre && validate_password && validate_dni && validate_apellido && validate_telefono && validate_direccion && validate_email && validate_rol) {
            //crear el objeto a guardar
            var cliente = new Cliente();
            cliente.nombre = params.nombre;
            cliente.apellido = params.apellido;
            cliente.direccion = params.direccion;
            cliente.telefono = params.telefono;
            cliente.email = params.email;
            cliente.dni = params.dni;
            cliente.password= params.password;
            cliente.rol = params.rol;




            //asignar valores

            //guardar el articulo

            cliente.save((err, guardarCliente) => {


                if (err || !guardarCliente) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El cliente no se ha guardado !!'
                    })
                }
                //devolver una respuesta

                return res.status(200).send({
                    status: 'success',
                    cliente: guardarCliente
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos!!'
            });
        }

    },
    //SACAR TODOS LOS CLIENTES

    obtenerClientes: (req, res) => {

        var query = Cliente.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(3);
        }

        //Find sacar los datos de la bd
        query.sort('-_id').exec((err, clientes) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error  al  devolver los clientes!!'
                })
            }

            if (!clientes) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay clientes para mostrar!!'
                })
            }

            return res.status(200).send({
                status: 'success',
                clientes
            });
        });


    },

    obtenerCliente: (req, res) => {

        //recoger el id de la URL

        var clienteId = req.params.id;
         console.log(clienteId+"ID")
        //comprobar que existe
        if (!clienteId || clienteId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el cliente!!'
            });
        }

        //buscar el articulo
        Cliente.findById(clienteId, (err, cliente) => {

            if (err || !cliente) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el cliente!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                cliente
            
            });
        });
        //Devolver en json

    },
    //ELIMINAR CLIENTE

    eliminarCliente: (req, res) => {


        //RECOGER EL ID DEL LA URL
        var clienteId = req.params.id;

        Cliente.findOneAndDelete({ _id: clienteId }, (err, eliminarCliente) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar'
                });
            }
            if (!eliminarCliente) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el cliente!'
                });
            }
            return res.status(200).send({
                status: 'succes',
                cliente: eliminarCliente
            });

        });



    },

    
     //EDITAR ARTICULOS

     editarCliente: (req, res) => {

        //Recoger el ID del articulo por la URL

        var clienteId = req.params.id;


        //Regoger los datos que llegan por put 
        var params = req.body;

        //Validar datos

        try {
           var validarteDni = !validator.isEmpty(params.dni);
            
        } catch (err) {

            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'
            });

        }

        if (validarteDni) {
            console.log("entra" + clienteId);
            Cliente.findOneAndUpdate({ _id: clienteId }, params, { new: true }, (err, actualizarCliente) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }


                if (!actualizarCliente) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el cliente!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    cliente: actualizarCliente
                });

            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }


    },


    buscarCliente: (req, res) => {

           //SACAR EL STRING A BUSCAR

        var buscarString = req.params.search;


        //BUSCAR    
        Cliente.find({
            "$or": [
                { "nombre": { "$regex": buscarString, "$options": "i" } },
                { "apellido": { "$regex": buscarString, "$options": "i" } },
                { "dni": { "$regex": buscarString, "$options": "i" } },
                { "direccion": { "$regex": buscarString, "$options": "i" } },
                { "email": { "$regex": buscarString, "$options": "i" } },
                { "rol": { "$regex": buscarString, "$options": "i" } },

            ]
        }).sort([['date', 'descending']]).exec((err, clientes) => {


            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición!!!"

                });
            }
            if (!clientes || clientes.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay clientes para mostrar con tu busquedad!!"

                });
            }
            return res.status(200).send({
                status: 'success',
                clientes

            });
        })



    },

}

module.exports = controller;