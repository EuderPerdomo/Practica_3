'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolSchema = Schema({
    nombre: {type: String, required: true},
});

module.exports =  mongoose.model('rol',RolSchema);