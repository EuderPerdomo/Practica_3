'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bodega_Tecnico = Schema({
    bodega:{type:Schema.ObjectId,ref:'bodega', required:true},
    //tecnico:[{type: Object, required: true}],
    tecnico:{type:Schema.ObjectId,ref:'admin', required:true},
    estado:{type:Boolean,default:false},
    createdAt: {type:Date, default: Date.now, required: true}
});

module.exports =  mongoose.model('bodega_tecnico',Bodega_Tecnico);