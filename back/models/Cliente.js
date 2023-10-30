'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    telefono: {type: String, required: false},
    tipo: {type: String, required: false},
    dni: {type: String, required: false},
    direccion:{type: String, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('cliente',ClienteSchema);