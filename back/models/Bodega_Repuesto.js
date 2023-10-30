'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bodega_Repuesto = Schema({
    bodega:{type:Schema.ObjectId,ref:'bodega', required:true},
    repuesto:{type:Schema.ObjectId,ref:'repuesto', required:true},
    cantidad:{type: Number, required: true},
    createdAt: {type:Date, default: Date.now, required: true}
});

module.exports =  mongoose.model('bodega_repuesto',Bodega_Repuesto);