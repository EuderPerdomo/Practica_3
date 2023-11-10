'use-stric'
var Repuesto = require('../models/Repuesto')
var Bodega_Repuesto = require('../models/Bodega_Repuesto')
var Bodega_Tecnico = require('../models/Bodega_Tecnico')
var Bodega = require('../models/Bodega')
var Traslado = require('../models/Traslado')
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose');

const listar_repuestos_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let tipo = req.params['tipo']
            var filtro = req.params['filtro']
            if (tipo == null || tipo == "null") {

                let reg = await Bodega.aggregate([
                    {
                        $unwind: "$repuestos"
                    },

                    { //Agrupas los elementos por repuestos.repuesto y sumamos la cantidad
                        $group: {
                            _id: {
                                grupo: "$repuestos.repuesto",
                            },
                            suma: {
                                $sum: "$repuestos.cantidad"
                            }
                        }
                    },

                    //Lookup a la informacion del repuesto
                    {
                        $lookup: {
                            from: 'repuestos',
                            localField: '_id.grupo',//'repuestos.repuesto'
                            foreignField: '_id',
                            as: 'repu'
                        }
                    },
                ])

                res.status(200).send({ data: reg })
            } else {
                if (tipo == 'modelo') {
                    //let reg=await Cliente.find({nombre:new RegExp(filtro,'i')})

                    //Inicia mi metodo

                    let reg = await Bodega.aggregate([
                        {
                            $unwind: "$repuestos"
                        },

                        { //Agrupas los elementos por repuestos.repuesto y sumamos la cantidad
                            $group: {
                                _id: {
                                    grupo: "$repuestos.repuesto",
                                },
                                suma: {
                                    $sum: "$repuestos.cantidad"
                                }
                            }
                        },

                        //Lookup a la informacion del repuesto
                        {
                            $lookup: {
                                from: 'repuestos',
                                localField: '_id.grupo',//'repuestos.repuesto'
                                foreignField: '_id',
                                as: 'repu'
                            }
                        }, { $match: { 'repu.modelo': { '$regex': new RegExp(filtro, 'i') } } }
                    ])
                    //Finaliza mi metodo

                    res.status(200).send({ data: reg })
                } else if (tipo == 'correo') {
                    res.status(500).send({ message: 'No se especifico un filtro' })

                }
            }




            ///console.log('respuesta consulta', reg)

            ///res.status(200).send({ data: reg })
        } else {
            res.status(500).send({ message: 'No Acces' })
        }
    } else {
        res.status(500).send({ message: 'No Acces' })
    }
}


//Registrar repuestos directamente en las bodegas
const registro_repuesto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body
            console.log('A registrat', data)
            var img_path = req.files.label.path
            var name = img_path.split('\\')
            var portada_name = name[2]
            data.label = portada_name

            //Primero Creamos el repuesto
            let reg = await Repuesto.create(data)


            //Ahora lo vinculo a la bodega
            var rep_garantia = await Bodega.findByIdAndUpdate({ _id: data.bodega }, {
                $push: {
                    repuestos: {
                        repuesto: reg._id,
                        cantidad: data.cantidad,
                    }
                }
            }, { useFindAndModify: false });

            res.status(200).send({ data: rep_garantia })

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const obtener_portada = async function (req, res) {
    var img = req.params['img']
    fs.stat('./uploads/repuestos/' + img, function (err) {
        if (!err) {
            let path_img = './uploads/repuestos/' + img
            res.status(200).sendFile(path.resolve(path_img))
        } else {
            let path_img = './uploads/default.jpg'
            res.status(200).sendFile(path.resolve(path_img))
        }
    })
}

//Consultar repuesto individual
const obtener_repuesto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id']
            try {
                var reg = await Repuesto.findById({ _id: id })
                res.status(200).send({ data: reg })
            } catch (error) {
                res.status(200).send({ data: undefined })
            }
        } else {
            res.status(500).send({ message: 'NO acces' })
        }
    } else {
        res.status(500).send({ message: 'NO acces' })
    }
}

const eliminar_repuesto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id']
            let reg = await Repuesto.findByIdAndRemove({ _id: id })
            res.status(200).send({ data: reg })
        } else {
            res.status(500).send({ message: 'NO acces' })
        }
    } else {
        res.status(500).send({ message: 'NO acces' })
    }
}


//Obtener existencias del Repuesto individual

const obtener_existencia_repuesto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id']
            try {
                /*
                console.log("id buscado", id)
                var reg = await Bodega_Repuesto.find({ repuesto: id }).populate('bodega').populate('repuesto')
                //var rego = await Bodega_Repuesto.aggregate([ { $match : { repuesto : id } } ])
                console.log('ncontrado', reg)
                res.status(200).send({ data: reg })
                */
                console.log("id buscado", id)
                var reg = await Bodega.aggregate([
                    {
                        $unwind: "$repuestos"
                    },

                    {
                        $addFields: {
                            conv: { $toString: "$repuestos.repuesto" }
                        }
                    },

                    {
                        $match:
                            { conv: id }
                    },

                    {
                        $lookup: {
                            from: 'repuestos',
                            localField: 'repuestos.repuesto',
                            foreignField: '_id',
                            as: 'detalles'
                        }
                    }

                ])
                console.log('Existencias', reg)

                res.status(200).send({ data: reg })

            } catch (error) {
                res.status(200).send({ data: undefined })
            }
        } else {
            res.status(500).send({ message: 'NO acces' })
        }
    } else {
        res.status(500).send({ message: 'NO acces' })
    }
}


const traslado_repuesto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body
            console.log('Datos del traslado', data)

            //Buscar si destino y repuesto ya existe
            //Si existe destino y repuesto
            // var destino_repuesto = await Bodega_Repuesto.find({ repuesto: data.id_repuesto, bodega: data.id_destino })

            var destino_repuesto = await Bodega.aggregate([
                {
                    $unwind: "$repuestos"
                },
                {
                    $addFields: {
                        id_repuesto: { $toString: "$repuestos.repuesto" },
                        id_bodega: { $toString: "$_id" }
                    }
                },

                {
                    $match: { $and: [{ id_repuesto: data.id_repuesto }, { id_bodega: data.id_destino }] }
                },

            ])
            console.log('destinos repuestos', destino_repuesto, destino_repuesto.length)



            //Consultar Origen********************************************************
            //var origen_repuesto = await Bodega_Repuesto.find({ repuesto: data.id_repuesto, bodega: data.id_origen })





            var origen_repuesto = await Bodega.aggregate([
                {
                    $unwind: "$repuestos"
                },
                {
                    $addFields: {
                        id_repuesto: { $toString: "$repuestos.repuesto" },
                        id_bodega: { $toString: "$_id" }
                    }
                },

                {
                    $match: { $and: [{ id_repuesto: data.id_repuesto }, { id_bodega: data.id_origen }] }
                },

            ])



            console.log('Datos Bodega Origen: ', origen_repuesto)
            console.log('segunda valiacion: ', origen_repuesto[0].repuestos.cantidad)


            //Cuando ya existe en el destino

            //validamos que en el origen la cantidad sea superior al traslado

            if (parseInt(origen_repuesto[0].repuestos.cantidad) >= parseInt(data.cantidad_traslado)) {
                console.log('repuestos suficientes')
                if (destino_repuesto.length >= 1) {//Si el repuesto existe en el destino la consulta es >=1

                    try { //Creo la solicitud de repuesto

                        datos = {
                            solicitante: data.id_tecnico,
                            bodega_origen: data.id_origen,
                            bodega_destino: data.id_destino,
                            repuesto: data.id_repuesto,
                            cantidad: data.cantidad_traslado,
                        }
                        var traslado = await Traslado.create(datos)
                        //TO DO
                        //Deberia descontarlos de una vez en el origen para evitar que se cuente con repuestos que pueden estar en transito
                        res.status(200).send({ message: 'Solicitud de traslado creada' })

                    } catch (error) {
                        console.log('error al crear Solciitud de traslado')
                    }

                } else {
                    //Cuando no existe en el distino
                    console.log('No existe el destino')
                    //Crear nuevo registro
                    /*
                            datos={
                                bodega:data.id_destino,
                                repuesto:data.id_repuesto,
                                cantidad:data.cantidad_traslado,
                            }
                            var reg= await Bodega_Repuesto.create(datos)
                    
                            //Actualizar el origen
                            id_origen=origen_repuesto[0]._id
                                var test=await Bodega_Repuesto.findByIdAndUpdate({_id:id_origen},{
                                    cantidad:parseInt(origen_repuesto[0].cantidad - parseInt(data.cantidad_traslado))
                                      })
                    */

                    try {

                        datos = {
                            solicitante: data.id_tecnico,
                            bodega_origen: data.id_origen,
                            bodega_destino: data.id_destino,
                            repuesto: data.id_repuesto,
                            cantidad: data.cantidad_traslado,
                        }
                        var traslado = await Traslado.create(datos)

                        //TODO, crear solicitud de traslado y esperar a confirmar recibido de traslado apra descontar
                        res.status(200).send({ message: 'Solicitud de traslado creada correctamente' })

                    } catch (error) {
                        console.log('error al crear Solciitud de traslado')
                    }

                }
            } else {
                res.status(400).send({ message: 'La cantidad a trasladar excede las existencias' });
            }

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const consultar_solicitudes_traslados_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var filtro = req.params['filtro']
            //let reg =await Repuesto.find({modelo: new RegExp(filtro,'i')})

            //Inicia mi metodo

            let reg = await Traslado.find().populate('solicitante').populate('bodega_origen').populate('bodega_destino').populate('repuesto').sort({ createdAt: -1 })
            //Finaliza mi mrtodo


            res.status(200).send({ data: reg })
        } else {
            res.status(500).send({ message: 'No Acces' })
        }
    } else {
        res.status(500).send({ message: 'No Acces' })
    }
}


const actualizar_estado_traslado_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var id_traslado = req.params['id']
            var data = req.body
            //console.log('traslado', data, id)

            if (data.estado == 'Terminado') {
                console.log(data, 'actualizar las bodegas')
                //Actualizo las bodegas

                //Buscar si destino y repuesto ya existe
                //Si existe destino y repuesto
                //var destino_repuesto = await Bodega_Repuesto.find({ repuesto: data.repuesto, bodega: data.destino })


                var destino_repuesto = await Bodega.aggregate([
                    {
                        $unwind: "$repuestos"
                    },
                    {
                        $addFields: {
                            id_repuesto: { $toString: "$repuestos.repuesto" },
                            id_bodega: { $toString: "$_id" }
                        }
                    },

                    {
                        $match: { $and: [{ id_repuesto: data.repuesto }, { id_bodega: data.destino }] }
                    },

                ])


                console.log('destinos repuestos', destino_repuesto, destino_repuesto.length)
                //Consultar Origen
                //var origen_repuesto = await Bodega_Repuesto.find({ repuesto: data.repuesto, bodega: data.origen })

                var origen_repuesto = await Bodega.aggregate([
                    {
                        $unwind: "$repuestos"
                    },
                    {
                        $addFields: {
                            id_repuesto: { $toString: "$repuestos.repuesto" },
                            id_bodega: { $toString: "$_id" }
                        }
                    },

                    {
                        $match: { $and: [{ id_repuesto: data.repuesto }, { id_bodega: data.origen }] }
                    },

                ])


                console.log('Datos Bodega Origen: ', origen_repuesto)
                console.log('segunda valiacion: ', origen_repuesto[0].repuestos.cantidad)

                //Cuando ya existe en el destino

                if (parseInt(origen_repuesto[0].repuestos.cantidad) >= parseInt(data.cantidad)) { //validamos que en el origen la cantidad sea superior al traslado
                    console.log('repuestos suficientes')
                    if (destino_repuesto.length >= 1) {//ya existe en el destino
                        console.log('Existe')

                        try {
                            id = destino_repuesto[0]._id
                            console.log('id de la bodega en el destino', id)
                            //Continuar---------Actualizar la cantidad en el destino********************************
                            /*
                                                        var test = await Bodega_Repuesto.findByIdAndUpdate({ _id: id }, {
                                                            cantidad: parseInt(data.cantidad) + parseInt(destino_repuesto[0].cantidad)
                                                        })
                            
                            */

                            id_destino = new mongoose.Types.ObjectId(id)
                            console.log('id_destino', id_destino)

                            //Paso 1, descuento el repuesto
                            var reg = await Bodega.updateOne(
                                { "_id": id_destino, "repuestos.repuesto": data.repuesto },
                                { $inc: { "repuestos.$.cantidad": data.cantidad } }
                            )
                            console.log('destino actualizado', reg, id_destino, data.repuesto, data.cantidad)


                            //Actualizar origen
                            id_origen = origen_repuesto[0]._id

                            var reg = await Bodega.updateOne(
                                { "_id": id_origen, "repuestos.repuesto": data.repuesto },
                                { $inc: { "repuestos.$.cantidad": -data.cantidad } }
                            )


                            /* var test = await Bodega_Repuesto.findByIdAndUpdate({ _id: id_origen }, {
                                 cantidad: parseInt(origen_repuesto[0].cantidad - parseInt(data.cantidad))
                             })*/

                            //Finalmente cambio el estado del traslado
                            var reg = await Traslado.findByIdAndUpdate({ _id: id_traslado }, {
                                estado: data.estado, //Estado cambia a Terminado         
                            })

                            res.status(200).send({ data: test })
                        } catch (error) {
                            console.log('errorrr')
                        }

                        //res.status(200).send({message:'ok'})

                    } else {
                        //Cuando no existe en el distino
                        console.log('No existe el destino')
                        //Crear nuevo registro
                        datos = {
                            bodega: data.destino,
                            repuesto: data.repuesto,
                            cantidad: data.cantidad,
                        }
                        // var reg = await Bodega_Repuesto.create(datos)
                        //Ahora lo vinculo a la bodega

                        var reg = await Bodega.findByIdAndUpdate({ _id: data.destino }, {
                            $push: {
                                repuestos: {
                                    repuesto: data.repuesto,
                                    cantidad: data.cantidad,
                                }
                            }
                        }, { useFindAndModify: false });


                        console.log('no existe en el destino, actualizado', reg)

                        //Actualizar el origen
                        /*id_origen = origen_repuesto[0]._id
                        var test = await Bodega_Repuesto.findByIdAndUpdate({ _id: id_origen }, {
                            cantidad: parseInt(origen_repuesto[0].cantidad - parseInt(data.cantidad))
                        })*/

                        id_origen = origen_repuesto[0]._id
                        var reg = await Bodega.updateOne(
                            { "_id": id_origen, "repuestos.repuesto": data.repuesto },
                            { $inc: { "repuestos.$.cantidad": -data.cantidad } }
                        )

                        //Actualizo estado
                        var reg = await Traslado.findByIdAndUpdate({ _id: id_traslado }, {
                            estado: data.estado, //Estado cambia a Transito          
                        })
                        res.status(200).send({ message: 'Traslado Correcto' })
                    }
                } else {
                    res.status(400).send({ message: 'La cantidad a trasladar excede las existencias' });
                }


                //Finaliza
            }

            if (data.estado == 'Transito') {
                //Actualizo solo el estado
                var reg = await Traslado.findByIdAndUpdate({ _id: id_traslado }, {
                    estado: data.estado, //Estado cambia a Transito          
                })
                res.status(200).send({ data: reg })
            }

        } else {
            res.status(500).send({ message: 'No acces' })
        }
    } else {
        res.status(500).send({ message: 'No acces' })
    }
}


//Consultar repuestos disponibles para el tecnico en la bodega
const consulta_repuesto_bodega_tecnico = async function (req, res) {//se mueve a admincontroller
    if (req.user) {
        if (req.user.role == 'admin') {

            var id = req.params['id']//ID DEL TECNICO
            console.log('Id del tecnico Buscado', id)
            try {
                //Buscar bodegas a las que el tecnico tiene acceso
                console.log('inicia busqueda')
                var reg = await Bodega_Tecnico.find(
                    {
                        $and: [
                            { tecnico: id },
                            { estado: false }
                        ]
                    }

                ).populate('bodega')
                res.status(200).send({ data: reg })
            } catch (error) {
                console.log(error)
                res.status(200).send({ data: undefined })
            }



        } else {
            res.status(500).send({ message: 'NO acces' })
        }
    } else {
        res.status(500).send({ message: 'NO acces' })
    }
}


//Creacion de traslados forma inicial original
const traslado_repuesto_admin_2 = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body
            console.log(data)

            //Buscar si destino y repuesto ya existe
            //Si existe destino y repuesto
            var destino_repuesto = await Bodega_Repuesto.find({ repuesto: data.id_repuesto, bodega: data.id_destino })
            console.log('destinos repuestos', destino_repuesto, destino_repuesto.length)
            //Consultar Origen
            var origen_repuesto = await Bodega_Repuesto.find({ repuesto: data.id_repuesto, bodega: data.id_origen })

            console.log('Datos Bodega Origen: ', origen_repuesto)
            console.log('segunda valiacion: ', origen_repuesto[0].cantidad)


            //Cuando ya existe en el destino

            if (parseInt(origen_repuesto[0].cantidad) >= parseInt(data.cantidad_traslado)) { //validamos que en el origen la cantidad sea superior al traslado
                console.log('repuestos suficientes')
                if (destino_repuesto.length >= 1) {
                    console.log('Existe')

                    try {
                        id = destino_repuesto[0]._id
                        var test = await Bodega_Repuesto.findByIdAndUpdate({ _id: id }, {
                            cantidad: parseInt(data.cantidad_traslado) + parseInt(destino_repuesto[0].cantidad)
                        })

                        //Actualizar origen
                        id_origen = origen_repuesto[0]._id
                        var test = await Bodega_Repuesto.findByIdAndUpdate({ _id: id_origen }, {
                            cantidad: parseInt(origen_repuesto[0].cantidad - parseInt(data.cantidad_traslado))
                        })

                        //res.status(200).send({data:test})
                    } catch (error) {
                        console.log('errorrr')
                    }

                    //TODO, crear solicitud de traslado y esperar a confirmar recibido de traslado apra descontar


                    res.status(200).send({ message: 'ok' })

                } else {
                    //Cuando no existe en el distino
                    console.log('No existe el destino')
                    //Crear nuevo registro
                    datos = {
                        bodega: data.id_destino,
                        repuesto: data.id_repuesto,
                        cantidad: data.cantidad_traslado,
                    }
                    var reg = await Bodega_Repuesto.create(datos)

                    //Actualizar el origen
                    id_origen = origen_repuesto[0]._id
                    var test = await Bodega_Repuesto.findByIdAndUpdate({ _id: id_origen }, {
                        cantidad: parseInt(origen_repuesto[0].cantidad - parseInt(data.cantidad_traslado))
                    })
                    //TODO, crear solicitud de traslado y esperar a confirmar recibido de traslado apra descontar
                    res.status(200).send({ message: 'Traslado Correcto' })
                }
            } else {
                res.status(400).send({ message: 'La cantidad a trasladar excede las existencias' });
            }

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}


const inventario_repuesto_admin = async function (req, res) {

    var reg = await Bodega.aggregate([
        {
            $unwind: "$repuestos"
        },
        {
            $lookup: {
                from: 'repuestos',
                localField: 'repuestos.repuesto',
                foreignField: '_id',
                as: 'repu'
            }
        },
        {
            $project: {
                bodega: "$nombre",
                cantidad: "$repuestos.cantidad",
                repu: 1,
            }
        }
    ])

    console.log('respuesta inventario', reg)

    res.status(200).send({ data: reg })


}


const actualizar_repuesto_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let id = req.params['id']
            let data = req.body

            if (req.files) {
                var img_path = req.files.label.path
                var name = img_path.split('\\')
                var portada_name = name[2]

                let reg = await Repuesto.findByIdAndUpdate({ _id: id }, {
                    modelo: data.modelo,
                    serial: data.serial,
                    tipo: data.tipo,
                    descripcion: data.descripcion,
                    cantidad: data.cantidad,
                    bodega: data.bodega,
                    label: portada_name
                })

                fs.stat('./uploads/productos/' + reg.portada, function (err) {
                    if (!err) {
                        fs.unlink('./uploads/productos/' + reg.portada, (err) => {
                            if (err) throw err
                        })
                    }
                })

                res.status(200).send({ data: reg })
            } else {
                let reg = await Repuesto.findByIdAndUpdate({ _id: id }, {
                    modelo: data.modelo,
                    serial: data.serial,
                    tipo: data.tipo,
                    descripcion: data.descripcion,
                    cantidad: data.cantidad,
                    bodega: data.bodega,
                })
                res.status(200).send({ data: reg })
            }
        } else {
            res.status(500).send({ message: 'No Acces' })
        }
    } else {
        res.status(500).send({ message: 'No Acces' })
    }
}


const agregar_inventario_repuesto_admin = async function (req, res) {
console.log('Agregar inventario repuesto')
    if (req.user) {
        if (req.user.role == 'admin') {
            console.log('req parma', req.params)
            let id = req.params['id']
            let data = req.body
            //TO DO
            //1. si repuesto y bodega ya existen, incrementar el valor
            //2. Si no existen crearlo
console.log('datos buscados',data,id)

            /*Iniciamos */

            console.log(data, 'actualizar las bodegas')

            var destino_repuesto = await Bodega.aggregate([
                {
                    $unwind: "$repuestos"
                },
                {
                    $addFields: {
                        id_repuesto: { $toString: "$repuestos.repuesto" },
                        id_bodega: { $toString: "$_id" }
                    }
                },

                {
                    $match: { $and: [{ id_repuesto: data.repuesto }, { id_bodega: data.destino }] }
                },

            ])
            console.log('destinos repuestos', destino_repuesto, destino_repuesto.length)
            //Consultar Origen
            //var origen_repuesto = await Bodega_Repuesto.find({ repuesto: data.repuesto, bodega: data.origen })

            //Cuando ya existe en el destino
            if (destino_repuesto.length >= 1) {//ya existe en el destino
                console.log('Existe')

                try {
                    id = destino_repuesto[0]._id
                    console.log('id de la bodega en el destino', id)
                    id_destino = new mongoose.Types.ObjectId(id)
                    console.log('id_destino', id_destino)

                    //Paso 1, descuento el repuesto
                    var existe = await Bodega.updateOne(
                        { "_id": id_destino, "repuestos.repuesto": data.repuesto },
                        { $inc: { "repuestos.$.cantidad": data.cantidad } }
                    )
                    console.log('destino actualizado', existe, id_destino, data.repuesto, data.cantidad)

                    res.status(200).send({ message: 'Nuevo inventario ingresado Correctamente' })
                } catch (error) {
                    console.log('errorrr')
                }

            } else {
                //Cuando no existe en el distino
                console.log('No existe el destino')
                //Crear nuevo registro
                datos = {
                    bodega: data.destino,
                    repuesto: data.repuesto,
                    cantidad: data.cantidad,
                }
                // var reg = await Bodega_Repuesto.create(datos)
                //Ahora lo vinculo a la bodega

                var reg_2 = await Bodega.findByIdAndUpdate({ _id: data.destino }, {
                    $push: {
                        repuestos: {
                            repuesto: data.repuesto,
                            cantidad: data.cantidad,
                        }
                    }
                }, { useFindAndModify: false });


                console.log('no existe en el destino, actualizado', reg_2)
                res.status(200).send({ message: 'Traslado Correcto' })
            }



            //Finaliza
            /*Finalizamos */


        } else {
            res.status(500).send({ message: 'No Acces' })
        }
    } else {
        res.status(500).send({ message: 'No Acces' })
    }
}

module.exports = {
    registro_repuesto_admin,
    listar_repuestos_admin,
    obtener_portada,
    eliminar_repuesto_admin,
    obtener_repuesto_admin,
    obtener_existencia_repuesto_admin,
    traslado_repuesto_admin,
    consultar_solicitudes_traslados_admin,
    actualizar_estado_traslado_admin,
    inventario_repuesto_admin,
    actualizar_repuesto_admin,
    agregar_inventario_repuesto_admin,
    //consulta_repuesto_bodega_tecnico,
}