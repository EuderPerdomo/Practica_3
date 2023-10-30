'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var listSchema = new mongoose.Schema({
    modelo: {type: String, required: true},
    serial: {type: String, required: true},
    tipo: {type: String, required: true},
    descripcion:{type: String, required: true},
    cantidad:{type: Number, required: true},
    label:{type: String, required: true},
    createdAt: {type:Date, default: Date.now, required: true},
});
*/
var listSchema = new mongoose.Schema({
    repuesto:{type:Schema.ObjectId,ref:'repuesto', required:true},
    cantidad:{type: Number, required: true},

});


var BodegaSchema = Schema({
    nombre: {type: String, required: true},
    direccion:{type: String, required: true},
    createdAt: {type:Date, default: Date.now, require: true},
    //repuestos:{type:Object,required:true}
    repuestos:[listSchema]//Asi cuando creo la bodega se innicia vacio
    //Agregar responsable de bodega
});

module.exports =  mongoose.model('bodega',BodegaSchema);