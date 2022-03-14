const express = require('express');
const controlCarrito = require('../controllers/carrito.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/carrito', [md_autenticacion.Auth, md_roles.verCliente], controlCarrito.agregarCompraAlCarrito);
api.get('/obtenerfacturacarrito',[md_autenticacion.Auth, md_roles.verCliente] , controlCarrito.obtenerfactura);




module.exports = api;