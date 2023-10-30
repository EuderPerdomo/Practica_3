const express = require('express')
//import userRoutes from '../routes/usuario'
//import cors from 'cors'

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000'

        //llamado a middlewares
this.middlewares()
        //Definicion de rutas
        this.routes()
    }

    middlewares(){
        //cors
        //this.app.use(cors())
        //Lectura de body
        this.app.use(express.json())
        //Carpeta publica
        this.app.use(express.static('public'))
    }


    routes() {

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port)
        })
    }

}

module.exports=Server