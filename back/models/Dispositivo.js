'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DispositivoSchema = Schema({
    modelo: {type: String, required: true},
    tipo: {type: String, required: true},//Referenciar al tipo
    descripcion:{type: String, required: true},
    fabricante:{type: String, required: true},//Refrenciar al Fabricante
    label:{type: String, required: true},
    createdAt: {type:Date, default: Date.now, required: true},
});

module.exports =  mongoose.model('dispositivo',DispositivoSchema);