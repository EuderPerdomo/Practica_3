'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrasladoSchema = Schema({
    solicitante:{type:Schema.ObjectId,ref:'admin', required:true},
    bodega_origen:{type:Schema.ObjectId,ref:'bodega', required:true},
    bodega_destino:{type:Schema.ObjectId,ref:'bodega', required:true},
    repuesto:{type:Schema.ObjectId,ref:'repuesto', required:true},
    cantidad:{type: Number, required: true},
    estado: {type: String, default: 'solicitado', required: true},
    createdAt: {type:Date, default: Date.now, required: true},
});

module.exports =  mongoose.model('traslado',TrasladoSchema);