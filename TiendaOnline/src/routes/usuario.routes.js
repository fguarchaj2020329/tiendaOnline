const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();


api.post('/registraradmin', usuarioControlador.RegistrarAdmin);
api.post('/registrarcliente', usuarioControlador.RegistrarCliente);
api.post('/login', usuarioControlador.Login);
api.post('/registrarusuario',[md_autenticacion.Auth, md_roles.verAdmin], usuarioControlador.RegistrarUsuario);
api.put('/editarUsuario/:idUsuario',[md_autenticacion.Auth, md_roles.verAdmin], usuarioControlador.EditarUsuario);
api.put('/editarusuariocliente/:idcliente',[md_autenticacion.Auth, md_roles.verCliente], usuarioControlador.EditarUsuarioCliente);
api.delete('/eliminaruserrolclien/:idcliente',[md_autenticacion.Auth, md_roles.verCliente], usuarioControlador.elimaruserirolCliente)

module.exports = api;