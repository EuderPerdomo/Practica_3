require('dotenv').config()
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8000;
var app = express();


var admin_route=require('./routes/admin')
var cliente_route=require('./routes/cliente')
var repuesto_route=require('./routes/repuesto')
var administracion_route=require('./routes/administracion')
var garantia_route=require('./routes/garantia')

const dbConnection = async () => {
 
    try {
        await mongoose.connect(process.env.URI_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('Conexion Exitosa con la Base de Datos');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la DB')
    }
}
 
//Base de Datos
dbConnection();
 
 
app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});


app.use('/api',admin_route)
app.use('/api',cliente_route)
app.use('/api',repuesto_route)
app.use('/api',administracion_route)
app.use('/api',garantia_route)

// levantar servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto:  ` + process.env.PORT);
});


module.exports = app;