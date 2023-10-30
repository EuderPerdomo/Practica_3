'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    telefono:{type:Number,required:true},
    oficina:{type:String,required:true},
    dni:{type:Number,required:true},
    password: {type: String, required: true},
    rol: {type: String, required: true},
    bodegas: [{type: Object, required: false}],
});

module.exports =  mongoose.model('admin',AdminSchema);