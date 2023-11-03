'use-stric'

var Garantia = require('../models/Garantia')
var fs = require('fs')
var path = require('path')
const Bodega = require('../models/Bodega')
var mongoose = require('mongoose');

const listar_garantias_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var filtro = req.params['filtro']
            let reg = await Garantia.find({ modelo: new RegExp(filtro, 'i') }).sort({ createdAt: -1 })
            res.status(200).send({ data: reg })
        } else {
            res.status(500).send({ message: 'No Acces' })
        }
    } else {
        res.status(500).send({ message: 'No Acces' })
    }
}


const registro_garantia_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let data = req.body
            var img_path = req.files.label.path

            var name = img_path.split('\\')
            var portada_name = name[2]
            //data.slug=data.modelo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
            data.label = portada_name

            //console.log('arreglo:', data.observaciones, 'Datos a registar', data)
            //data.observaciones = { fecha: Date.now(), observacion: data.observaciones }

            let reg = await Garantia.create(data)

            res.status(200).send({ data: reg })

        } else {
            res.status(500).send({ message: 'NoAccess' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}


const actualizar_garantia_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            let id = req.params['id']
            let data = req.body

            if (req.files) {
                var img_path = req.files.label.path
                var name = img_path.split('\\')
                var portada_name = name[2]

                let reg = await Garantia.findByIdAndUpdate({ _id: id }, {

                    modelo: data.modelo,
                    serial: data.serial,
                    observaciones_ingreso: data.observaciones,
                    diagnostico_cliente: data.diagnostico_cliente,
                    oficina: data.oficina,
                    numero_factura: data.numero_factura,
                    fecha_factura: data.fecha_factura,
                    cliente: data.cliente,
                    label: portada_name,
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
                let reg = await Garantia.findByIdAndUpdate({ _id: id }, {
                    modelo: data.modelo,
                    serial: data.serial,
                    observaciones_ingreso: data.observaciones,
                    diagnostico_cliente: data.diagnostico_cliente,
                    oficina: data.oficina,
                    numero_factura: data.numero_factura,
                    fecha_factura: data.fecha_factura,
                    cliente: data.cliente,
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



const obtener_garantia_admin = async function (req, res) {
    console.log('buscando garantia')
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id']
            try {
                var reg = await Garantia.findById({ _id: id }).populate('cliente')
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

const agregar_observacion_garantia_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id']
            var data = req.body
            console.log(id, data)

            var reg = await Garantia.findByIdAndUpdate({ _id: id }, {
                $push: {
                    observaciones: {
                        fecha: Date.now(),
                        observacion: data.observacion,
                    }
                }
            }, { useFindAndModify: false });

            /*
                        var reg =await Garantia.findByIdAndUpdate({_id:id},{
                            observacion:data.observacion,
                        })
                        */
            console.log('despues de')
            res.status(200).send({ data: reg })

        } else {
            res.status(500).send({ message: 'No acces' })
        }
    } else {
        res.status(500).send({ message: 'No acces' })
    }
}



const agregar_repuesto_garantia_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var id = req.params['id']
            var data = req.body
            console.log(data)

            console.log(typeof (data.id_bodega))
            idd = new mongoose.Types.ObjectId(data.id_bodega)

            //Paso 1, descuento el repuesto
            var reg = await Bodega.updateOne(
                { "_id": idd, "repuestos.repuesto": data.id_repuesto },
                { $inc: { "repuestos.$.cantidad": -1 } }
            )

            //Paso 2, vinculo el repuesto con la garantia
            var rep_garantia = await Garantia.findByIdAndUpdate({ _id: data.id_garantia }, {
                $push: {
                    repuestos: {
                        fecha: Date.now(),
                        repuesto: data.id_repuesto,
                    }
                }
            }, { useFindAndModify: false });

            res.status(200).send({ data: rep_garantia })

        } else {
            res.status(500).send({ message: 'No acces' })
        }
    } else {
        res.status(500).send({ message: 'No acces' })
    }
}

module.exports = {
    listar_garantias_admin,
    registro_garantia_admin,
    actualizar_garantia_admin,
    obtener_garantia_admin,
    agregar_observacion_garantia_admin,
    agregar_repuesto_garantia_admin,
}