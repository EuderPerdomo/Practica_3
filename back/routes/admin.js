'use strict'
var express=require('express')
var AdminController=require('../controllers/AdminController')

var api=express.Router()
var auth = require('../middlewares/authenticate');

api.post('/registro_admin',AdminController.registro_admin)
api.post('/login_admin',AdminController.login_admin)

//api.post('/registro_repuesto_admin',auth.auth,AdminController.registro_repuesto_admin)
//
api.get('/verificar_token',auth.auth,AdminController.verificar_token);

api.get('/consultar_bodegas_autorizadas_admin/:id',auth.auth,AdminController.consultar_bodegas_autorizadas_admin)

module.exports=api