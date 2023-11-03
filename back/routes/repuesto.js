'use strict'
var express=require('express')
var RepuestoController=require('../controllers/RepuestoController')

var api=express.Router()
var auth=require('../middlewares/authenticate')
var multiparty=require('connect-multiparty')
var path=multiparty({uploadDir:'./uploads/repuestos'})

api.post('/registro_repuesto_admin',[auth.auth,path],RepuestoController.registro_repuesto_admin)
api.get('/listar_repuestos_admin/:filtro?',[auth.auth],RepuestoController.listar_repuestos_admin)
api.get('/obtener_repuesto_admin/:id',auth.auth,RepuestoController.obtener_repuesto_admin)
api.get('/obtener_portada/:img',RepuestoController.obtener_portada)
api.delete('/eliminar_repuesto_admin/:id',auth.auth,RepuestoController.eliminar_repuesto_admin)
api.put('/actualizar_repuesto_admin/:id',[auth.auth,path],RepuestoController.actualizar_repuesto_admin);

api.get('/obtener_existencia_repuesto_admin/:id',auth.auth,RepuestoController.obtener_existencia_repuesto_admin)
api.post('/traslado_repuesto_admin',[auth.auth,path],RepuestoController.traslado_repuesto_admin)

//Hacer inventario de los repuestos
api.get('/inventario_repuesto_admin',auth.auth,RepuestoController.inventario_repuesto_admin)

//Consultar repuestos bodega tecnico
//api.get ('/consulta_repuesto_bodega_tecnico/:id',auth.auth,RepuestoController.consulta_repuesto_bodega_tecnico) 

//Administracion de traslados
api.get('/consultar_solicitudes_traslados_admin',auth.auth,RepuestoController.consultar_solicitudes_traslados_admin)
api.put('/actualizar_estado_traslado_admin/:id',auth.auth,RepuestoController.actualizar_estado_traslado_admin)
module.exports=api