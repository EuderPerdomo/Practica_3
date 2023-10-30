'use strict'
var express=require('express')
var GarantiaController=require('../controllers/GarantiaController')

var api=express.Router()
var auth=require('../middlewares/authenticate')
var multiparty=require('connect-multiparty')
var path=multiparty({uploadDir:'./uploads/repuestos'})

api.post('/registro_garantia_admin',[auth.auth,path],GarantiaController.registro_garantia_admin)
api.get('/listar_garantias_admin/:filtro?',[auth.auth],GarantiaController.listar_garantias_admin)
api.get('/obtener_garantia_admin/:id',auth.auth,GarantiaController.obtener_garantia_admin)
api.put('/agregar_observacion_garantia_admin/:id',auth.auth,GarantiaController.agregar_observacion_garantia_admin)
api.put('/agregar_repuesto_garantia_admin',auth.auth,GarantiaController.agregar_repuesto_garantia_admin)

//api.delete('/eliminar_garantia_admin/:id',auth.auth,GarantiaController.eliminar_garantia_admin)

module.exports=api