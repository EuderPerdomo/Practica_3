'use strict'
var Bodega = require('../models/Bodega')
var Admin = require('../models/Admin')
var Rol = require('../models/Rol')
var bcrypt = require('bcrypt-nodejs')

const registro_bodega_admin = async function (req, res) {
    var data = req.body
    //Verificar nOmbre
    console.log('backend', data)
    var bodega_arr = []
    bodega_arr = await Bodega.find({ nombre: data.nombre })
    if (bodega_arr == 0) {
        //Registro
        var reg = await Bodega.create(data)
        res.status(200).send({ message: reg })

    } else {
        res.status(200).send({ message: 'La Bodega ya existe en la base de datos', data: undefined })
    }
}


const listar_bodegas_admin = async function (req, res) {
console.log('listando bodegas')
    if (req.user) {
        if (req.user.role == 'admin') {
            let reg = await Bodega.find()
            res.status(200).send({ data: reg })
        } else {
            res.status(500).send({ message: 'NO acces' })
        }
    } else {
        res.status(500).send({ message: 'NO acces' })
    }


}


const obtener_bodega_admin=async function(req,res){
if(req.user){
    if(req.user.role=='admin'){
        var id=req.params['id']
        try {
            var reg =await Bodega.findById({_id:id})
            res.status(200).send({data:reg})
        } catch (error) {
            res.status(200).send({data:undefined})
        }
    }else{
        res.status(500).send({message:'NO acces'})
    }
}else{
    res.status(500).send({message:'NO acces'})
}
}


const actualizar_bodega_admin=async function(req,res){
    if(req.user){
        if(req.user.role=='admin'){
            var id=req.params['id']
            var data=req.body
            var reg =await Bodega.findByIdAndUpdate({_id:id},{
                nombre:data.nombre,
                direccion:data.direccion,
                
            })
            res.status(200).send({data:reg})
        }else{
            res.status(500).send({message:'No acces'})
        }
    }else{
        res.status(500).send({message:'No acces'})
    }
}

const eliminar_bodega_admin=async function(req,res){
    if(req.user){
        if(req.user.role=='admin'){
            var id=req.params['id']
            let reg =await Bodega.findByIdAndRemove({_id:id})
            res.status(200).send({data:reg})
        }else{
            res.status(500).send({message:'No acces'})
        }
    }else{
        res.status(500).send({message:'No acces'})
    }
}

//USUARIOS ++++++++++++++++++++++++

const registro_usuario_admin=async function(req,res){
    var data=req.body
    //Verificar Correo
    var admin_arr=[]
    admin_arr=await Admin.find({email:data.email})
    if(admin_arr==0){
    //Registro
    if(data.password){
    bcrypt.hash(data.password,null,null,async function(err,hash){
    if(hash){
        data.password=hash
        var reg=await Admin.create(data)
        res.status(200).send({message:reg})
    }else{
        res.status(200).send({message:'Error en el registro',data:undefined})
    }
    })
    }else{
        res.status(200).send({message:'Debe ingresar una contraseña',data:undefined})
    }

    }else{
        res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined})
    }
    }

const listar_usuarios_admin = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'admin') {
            let reg = await Admin.find()
            res.status(200).send({ data: reg })
        } else {
            res.status(500).send({ message: 'NO acces' })
        }
    } else {
        res.status(500).send({ message: 'NO acces' })
    }


}

const listar_roles_admin = async function (req, res) {

    if (req.user) {
        if (req.user.role == 'admin') {
            let reg = await Rol.find()
            res.status(200).send({ data: reg })
        } else {
            res.status(500).send({ message: 'NO acces' })
        }
    } else {
        res.status(500).send({ message: 'NO acces' })
    }


}

module.exports = {
    registro_bodega_admin,
    listar_bodegas_admin,
    eliminar_bodega_admin,
    actualizar_bodega_admin,
    obtener_bodega_admin,
    listar_usuarios_admin,
    listar_roles_admin,
    registro_usuario_admin,
}