const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');



function RegistrarAdmin(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();


    usuarioModel.usuario = 'ADMIN';
    usuarioModel.email = 'ADMIN';
    usuarioModel.rol = 'ADMIN';


    Usuario.find({ email : 'ADMIN' }, (err, usuarioEncontrado) => {
        if ( usuarioEncontrado.length == 0 ) {

            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' });
                    if(!usuarioGuardado) return res.status(500)
                        .send({ mensaje: 'Error al agregar el Usuario'});
                    
                    return res.status(200).send({ usuario: usuarioGuardado });
                });
            });                    
        } else {
            return res.status(500)
                .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
        }
    })
    
}


function RegistrarCliente(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.nombre && parametros.email && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'Cliente';
            usuarioModel.imagen = null;

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}


function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{
                    if ( verificacionPassword ) {
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }

                        
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error el correo no se encuentra registrado.'})
        }
    })
}


function RegistrarUsuario(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.usuario && parametros.email && parametros.password) {
            usuarioModel.usuario = parametros.usuario;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'Cliente';

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo ya  se encuentra utilizado' });
                }
            })
    }
}

function EditarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;    


    Usuario.findByIdAndUpdate(idUser, parametros, {new : true}, (err, usuarioActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!usuarioActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario'});
            
            return res.status(200).send({usuario : usuarioActualizado})
        })
     }

     function EditarUsuarioCliente(req, res) {
        var idUser = req.params.idcliente;
        var parametros = req.body;    
    
    
        Usuario.findByIdAndUpdate(idUser, parametros, {new : true}, (err, usuarioActualizado)=>{
                if(err) return res.status(500)
                    .send({ mensaje: 'Error en la peticion' });
                if(!usuarioActualizado) return res.status(500)
                    .send({ mensaje: 'Error al editar el Usuario'});
                
                return res.status(200).send({cliente : usuarioActualizado})
            })
         }


         function elimaruserirolCliente(req, res){
             var idcliente = req.params.idcliente;
            
             Usuario.findByIdAndDelete(idcliente,(err, clienteEliminado)=>{
                if(err) return res.status(400).send({ mensaje: "Error en la peticion"});
                if(!clienteEliminado) return res.status(400).send({mensaje: "Error al eliminar la empresa"});
        
                return res.status(200).send({cliente: clienteEliminado})

             })
         }

module.exports = {
    RegistrarUsuario,
    Login,
    EditarUsuario,
    RegistrarAdmin,
    EditarUsuarioCliente,
    elimaruserirolCliente,
    RegistrarCliente

}