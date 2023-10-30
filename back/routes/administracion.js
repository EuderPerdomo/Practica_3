'use strict'
var express=require('express')
var AdministracionController=require('../controllers/Administracion')

var api=express.Router()
var auth = require('../middlewares/authenticate');

api.post('/registro_bodega_admin',AdministracionController.registro_bodega_admin)
api.get('/listar_bodegas_admin',auth.auth,AdministracionController.listar_bodegas_admin)
api.get('/obtener_bodega_admin/:id',auth.auth,AdministracionController.obtener_bodega_admin)
api.put('/actualizar_bodega_admin/:id',auth.auth,AdministracionController.actualizar_bodega_admin)
api.delete('/eliminar_bodega_admin/:id',auth.auth,AdministracionController.eliminar_bodega_admin)


//Usarios ++++++++++++++++++++++++
api.post('/registro_usuario_admin',AdministracionController.registro_usuario_admin)
api.get('/listar_usuarios_admin',auth.auth,AdministracionController.listar_usuarios_admin)

//Roles +++++++++++++++++++++++++++
api.get('/listar_roles_admin',auth.auth,AdministracionController.listar_roles_admin)

module.exports=api