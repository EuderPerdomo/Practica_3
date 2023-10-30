'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RepuestoSchema = Schema({
    modelo: {type: String, required: true},
    serial: {type: String, required: true},
    tipo: {type: String, required: true},
    descripcion:{type: String, required: true},
    cantidad:{type: Number, required: true},
    label:{type: String, required: true},
    createdAt: {type:Date, default: Date.now, required: true},
});

module.exports =  mongoose.model('repuesto',RepuestoSchema);