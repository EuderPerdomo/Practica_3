'use strict'
var Admin = require('../models/Admin')
var Repuesto = require('../models/Repuesto')
var Bodega_Tecnico = require('../models/Bodega_Tecnico')
var Bodega = require('../models/Bodega')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../helpers/jwt');


const registro_admin = async function (req, res) {
    var data = req.body

    //Verificar Correo
    var admin_arr = []
    admin_arr = await Admin.find({ email: data.email })
    if (admin_arr == 0) {
        //Registro
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) {
                    data.password = hash
                    var reg = await Admin.create(data)
                    res.status(200).send({ message: reg })
                } else {
                    res.status(200).send({ message: 'Error en el registro', data: undefined })
                }
            })
        } else {
            res.status(200).send({ message: 'Debe ingresar una contraseña', data: undefined })
        }

    } else {
        res.status(200).send({ message: 'El correo ya existe en la base de datos', data: undefined })
    }
}


const login_admin = async function (req, res) {
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({ email: data.email });

    if (admin_arr.length == 0) {
        res.status(200).send({ message: 'El correo electrónico no existe', data: undefined });
    } else {
        //LOGIN
        let user = admin_arr[0];
        bcrypt.compare(data.password, user.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({ message: 'Las credenciales no coinciden', data: undefined });
            }
        });

    }
}


const registro_repuesto_admin = async function (req, res) {
    console.log('Por este lado', req.user)
    if (req.user) {
        let data = req.body;
        console.log('Cuerpo', req.body)
        let repuestos = await Repuesto.find({ modelo: data.modelo });


        //let arr_etiquetas = JSON.parse(data.etiquetas);
        if (repuestos.length == 0) {
            console.log(req.file)
            var img_path = req.files.label.path;
            // data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

            const { secure_url } = await cloudinary.uploader.upload(img_path)

            data.label = secure_url;
            let reg = await Repuesto.create(data);

            if (arr_etiquetas.length >= 1) {
                for (var item of arr_etiquetas) {
                    await Repuesto_etiqueta.create({
                        etiqueta: item.etiqueta,
                        repuesto: reg._id,
                    });
                }
            }

            res.status(200).send({ data: reg });
        } else {
            res.status(200).send({ data: undefined, message: 'El modelo del repuesto ya existe' });
        }
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}

const listar_repuestos_admin = async function (req, res) {
    if (req.user) {
        var repuestos = await Repuesto.find();




        res.status(200).send({ data: repuestos });
    } else {
        res.status(500).send({ message: 'NoAccess' });
    }
}


const consultar_bodegas_autorizadas_admin = async function (req, res) {//consulta_repuesto_bodega_tecnico

    if (req.user) {
        if (req.user.role == 'admin') {

            var id = req.params['id']//ID DEL TECNICO
            console.log('Id del tecnico Buscado', id)

            //Primero traer lisat de bodegas
            try {
                var bodeg = await Admin.find({ _id: id })
                var bodegas = bodeg[0].bodegas
                console.log('bodegas permitidas', bodegas)
            } catch (error) {
                console.log(error)
            }
            try {
                //Buscar bodegas a las que el tecnico tiene acceso
                console.log('inicia busqueda')

                var reg = await Bodega.aggregate([
                    {
                        $addFields: {
                            conv: { $toString: "$_id" }                           
                        }
                    },

                    {
                        $match: {
                            conv: {
                                $in: bodegas
                            }
                        }
                    },

                    /*
                                          {
                                        $match:{conv:'6536c5db931f2339341df256'}//Reeemplazar por id de bodegas
                                        },
                    */
                    {
                        $unwind: "$repuestos"
                    },

                    {
                    $addFields: {                       
                        elid: { $toObjectId: "$repuestos.repuesto" }
                    }
                },
                    {
                        $lookup: {
                            from: 'repuestos',
                            localField: "elid",//'repuestos.repuesto'
                            foreignField: '_id',
                            as: 'repu'
                        }
                    },
//

                    {
                        $group : { _id : "$_id", repu: { $push: "$repu" }, cantidad:{ $push: "$repuestos.cantidad" },nombre:{ $push: "$nombre" }} //$group:{_id:"$nombre"} 
                   },

                   //

                    {
                        $project: {
                            repu: 1,
                            //cantidad: "$repuestos.cantidad",
                            nombre: 1,
                            cantidad:1
                            //_id:1
                        }
                    },

                    

                ])
                console.log('respuesta obtenida', reg)

                res.status(200).send({ data: reg })

            } catch (error) {
                console.log(error)
                res.status(200).send({ data: undefined })
            }



        } else {
            res.status(500).send({ message: 'NO acces' })
        }
    } else {
        res.status(500).send({ message: 'NO acces' })
    }
}


const verificar_token = async function (req, res) {
    console.log(req.user);
    if (req.user) {
        res.status(200).send({ data: req.user });
    } else {
        console.log(2);
        res.status(500).send({ message: 'NoAccess' });
    }
}

module.exports = {
    registro_admin,
    login_admin,
    verificar_token,
    consultar_bodegas_autorizadas_admin,
    //registro_repuesto_admin,
    //listar_repuestos_admin,
}