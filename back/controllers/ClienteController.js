'use strict'
var Cliente=require('../models/Cliente')
var bcrypt=require('bcrypt-nodejs')

const registro_cliente=async function(req,res){
var data=req.body
//Verificar Correo
var cliente_arr=[]
cliente_arr=await Cliente.find({email:data.email})
if(cliente_arr==0){
//Registro
var reg=await Cliente.create(data)
res.status(200).send({message:reg})

}else{
    res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined})
}
}

const listar_clientes_filtro_admin=async function(req,res){
    
    if(req.user){
        if(req.user.role=='admin'){
            let tipo =req.params['tipo']
            let filtro=req.params['filtro']
            if(tipo==null || tipo=="null"){
                let reg=await Cliente.find()
                res.status(200).send({data:reg})
            } else{
                if(tipo=='nombre' ){                   
                    let reg=await Cliente.find({nombre:new RegExp(filtro,'i')})
                    res.status(200).send({data:reg})
                }else if(tipo=='correo'){
                    let reg=await Cliente.find({email:new RegExp(filtro,'i')})
                    res.status(200).send({data:reg})
            
                }
            }
    
        }else{
    res.status(500).send({message:'NO acces'})
        }
    
    }else{
        res.status(500).send({message:'NO acces'})
    }
    
        
    }

const registro_cliente_admin=async function(req,res){
    console.log(req.body)
if(req.user){
    if(req.user.role=='admin'){
        var data=req.body
        let reg=await Cliente.create(data)
        res.status(200).send({data:reg})
    }else{
        res.status(500).send({message:'NO acces'})
    }
}else{
    res.status(500).send({message:'NO acces'})
}
}

const obtener_cliente_admin=async function(req,res){
    if(req.user){
        if(req.user.role=='admin'){
            var id=req.params['id']
            try {
            var reg=await Cliente.findById({_id:id})
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

const actualizar_cliente_admin=async function(req,res){
    if(req.user){
        if(req.user.role=='admin'){
            var id=req.params['id']
            var data=req.body
            var reg =await Cliente.findByIdAndUpdate({_id:id},{
                nombre:data.nombre,
                tipo:data.tipo,
                correo:data.correo,
                telefono:data.telefono,
                direccion:data.direccion,
                dni:data.dni
            })
            res.status(200).send({data:reg})
        }else{
            res.status(500).send({message:'No acces'})
        }
    }else{
        res.status(500).send({message:'No acces'})
    }
}

const eliminar_cliente_admin=async function(req,res){
    if(req.user){
        if(req.user.role=='admin'){
            var id=req.params['id']
            let reg =await Cliente.findByIdAndRemove({_id:id})
            res.status(200).send({data:reg})
        }else{
            res.status(500).send({message:'No acces'})
        }
    }else{
        res.status(500).send({message:'No acces'})
    }
}
module.exports={
    registro_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin,
}