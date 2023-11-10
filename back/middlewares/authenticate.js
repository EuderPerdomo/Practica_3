'use strict'
var jwt =require('jwt-simple')
var moment=require('moment')
var secret='3ud3774814n'


exports.auth=function(req,res,next){
if(!req.headers.authorization){
return res.status(403).send({message:'No Header error'})
}
var token=req.headers.authorization.replace(/['"]+/g,'')
var segment=token.split('.')
if (segment.length !=3){
    return res.status(403).send({message:'token no valido'})
}else{
    try{
var payload =jwt.decode(token,secret)
if(payload.exp<=moment().unix()){
    return res.status(403).send({message:'token expirado'})
}
    }catch(error){
        return res.status(403).send({message:'token no valido'})
    }
}
req.user=payload
next()
}