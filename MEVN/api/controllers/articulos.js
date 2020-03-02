'use strict'
var validator = require('validator');
var Articulo = require('../models/articulos');
var fs = require('fs');
var path = require('path');

var controller = {

    
    //CREAR NUEVO ARTICULO

    guardarArticulo: (req, res) => {

        //recoger parametros por post 
        var params = req.body;

        console.log(params);

        //VALIDAR DATOS
        try {
            var validarteNombre = !validator.isEmpty(params.nombre);
            var validatedesc = !validator.isEmpty(params.descripcion);
        } catch (err) {
            status: 'error'
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            });
        }

        if (validarteNombre && validatedesc) {
            //crear el objeto a guardar
            var articulo = new Articulo();
            articulo.nombre = params.nombre;
            articulo.descripcion = params.descripcion;
            articulo.imagen = null;
            articulo.precio = params.precio;
            articulo.stock = params.stock;

         
            //asignar valores

            //guardar el articulo
            articulo.save((err, guardarArticulo) => {


                if (err || !guardarArticulo) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El artículo no se ha guardado !!'
                    })
                }
                //devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    articulo: guardarArticulo
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos!!'
            });
        }

    },

     //SACAR TODOS LOS ARTÍCULOS

     obtenerArticulos: (req, res) => {

        var query = Articulo.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }

        //Find sacar los datos de la bd
        query.sort('-_id').exec((err, articulos) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error  al  devolver los articulos!!'
                })
            }

            if (!articulos) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar!!'
                })
            }

            return res.status(200).send({
                status: 'success',
                articulos
            });
        });


    },

    //Obtener un articulo
    obtenerArticulo: (req, res) => {

        //recoger el id de la URL

        var articuloId = req.params.id;

        //comprobar que existe
        if (!articuloId || articuloId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo!!'
            });
        }

        //buscar el articulo
        Articulo.findById(articuloId, (err, articulo) => {

            if (err || !articulo) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulos!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                articulo
            });
        });

    },

     //EDITAR ARTICULOS

     editarArticulo: (req, res) => {

        //Recoger el ID del articulo por la URL

        var articuloId = req.params.id;


        //Regoger los datos que llegan por put 
        var params = req.body;

        //Validar datos

        try {
           var validarteNombre = !validator.isEmpty(params.nombre);
            var validatedesc = !validator.isEmpty(params.descripcion);

        } catch (err) {

            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!!'
            });

        }

        if (validarteNombre && validatedesc) {
            console.log("entra" + articuloId);
            Articulo.findOneAndUpdate({ _id: articuloId }, params, { new: true }, (err, actualizarArticulo) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }


                if (!actualizarArticulo) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo!!'
                    });
                }
                return res.status(404).send({
                    status: 'success',
                    articulo: actualizarArticulo
                });

            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }


    },
    //ELIMINAR ARTICULO

    eliminarArticulo: (req, res) => {


        //RECOGER EL ID DEL LA URL
        var articuloId = req.params.id;

        //fing and delete

        Articulo.findOneAndDelete({ _id: articuloId }, (err, eliminarArticulo) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar'
                });
            }
            if (!eliminarArticulo) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo!!'
                });
            }
            return res.status(200).send({
                status: 'succes',
                articulo: eliminarArticulo
            });

        });



    },

    //SUBIDA DE ARCHIVOS 

    upload: (req, res) => {

        //configurar el modulo connect multiparty 


        //recoger el fichero de la peticion 
        var file_name = 'imagen no subida..';

        console.log(req.files);
        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //conseguir el nombre y la extensión del archivo

        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        var file_name = file_split[2];

        //extension del fichero 
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //comproba la extencion (solo imagenes )

        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar el artivo subido
            console.log("entra");
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: "error",
                    message: 'La extension de la imagen no es valida!!!'
                });
            })
        } else {
            //Si todo es valido, bucar el artículo asignarle el nombre la img y actualizar
            var articuloId = req.params.id;
            console.log(articuloId);
            Articulo.findOneAndUpdate({ _id: articuloId }, { imagen: file_name }, { new: true }, (err, actualizarArticulo) => {
                console.log(actualizarArticulo);
                if (err || !actualizarArticulo) {
                    return res.status(200).send({
                        status: "error",
                        message: "Error al guardar la imagen de articulo"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    articulo: actualizarArticulo
                });
            });


        }



    },

    obtenerImagen: (req, res) => {
        var file = req.params.image;
        console.log(file);
        var path_file = './upload/articulo/' + file;

        fs.exists(path_file, (exists) => {
            console.log(exists);
            if (exists) {
                console.log("exiii");
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });
    },

    buscar: (req, res) => {

        //SACAR EL STRING A BUSCAR

        var buscarString = req.params.search;


        //FIND OR
        Articulo.find({
            "$or": [
                { "nombre": { "$regex": buscarString, "$options": "i" } },
                { "descripcion": { "$regex": buscarString, "$options": "i" } },

            ]
        }).sort([['date', 'descending']]).exec((err, articulos) => {


            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición!!!"

                });
            }
            if (!articulos || articulos.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay articulos para mostrar con tu busquedad!!"

                });
            }
            return res.status(200).send({
                status: 'success',
                articulos

            });
        })



    }





};

module.exports = controller;
