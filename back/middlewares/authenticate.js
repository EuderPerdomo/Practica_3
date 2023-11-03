'use strict'
var jwt =require('jwt-simple')
var moment=require('moment')
var secret='3ud3774814n'


exports.auth=function(req,res,next){
    
if(!req.headers.authorization){
    console.log(req.headers.authorization)
    console.log('No header error')
return res.status(403).send({message:'No Header error'})
}
var token=req.headers.authorization.replace(/['"]+/g,'')
var segment=token.split('.')
if (segment.length !=3){
    console.log('Token  no valido')
    return res.status(403).send({message:'token no valido'})
}else{
    try{
var payload =jwt.decode(token,secret)
if(payload.exp<=moment().unix()){
    console.log('Token  expirado')
    return res.status(403).send({message:'token expirado'})
}
    }catch(error){
        console.log('Token  no valido, error')
        return res.status(403).send({message:'token no valido'})
    }
}
req.user=payload
next()
}