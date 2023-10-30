'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GarantiaSchema = Schema({
    cliente:{type:Schema.ObjectId,ref:'cliente', required:true},
    modelo: {type: String, required: true},
    serial: {type: String, required: true},
    observaciones: [{type: Object, required: false}],
    estado: {type: String, default: 'Por revisar', required: true},
    diagnostico_cliente:{type: String, required: true},
    oficina: {type: String, required: true},
    label:{type: String, required: false},
    numero_factura: {type: String, required: false},
    fecha_factura: {type:Date, default: Date.now, required: false},
    repuestos:[],
    createdAt: {type:Date, default: Date.now, required: true}
});

module.exports =  mongoose.model('garantia',GarantiaSchema);