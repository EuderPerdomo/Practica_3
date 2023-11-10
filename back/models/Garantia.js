'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GarantiaSchema = Schema({
    cliente:{type:Schema.ObjectId,ref:'cliente', required:true},
    modelo: {type: String, required: true},//Referenciar a modelos
    serial: {type: String, required: true},
    observaciones: [{type: Object, required: false}],
    estado: {type: String, default: 'Por Revisar', required: true},
    observaciones_ingreso: {type: String, required: true},
    diagnostico_cliente:{type: String, required: true},
    oficina: {type: String, required: true},//Referenciar a la oficina
    label:{type: String, required: false},
    numero_factura: {type: String, required: false},
    fecha_factura: {type:Date, default: Date.now, required: false},
    repuestos:[],//Se inserta con refrencia a los repuestos
    createdAt: {type:Date, default: Date.now, required: true}
});

module.exports =  mongoose.model('garantia',GarantiaSchema);