const express = require('express');
const controlProducto = require('../controllers/producto.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarproducto', [md_autenticacion.Auth, md_roles.verAdmin], controlProducto.agregarProducto);
api.get('/obtenerproducto', [md_autenticacion.Auth, md_roles.verAdmin], controlProducto.obtenerProducto);
api.put('/editarproducto/:idproducto', [md_autenticacion.Auth, md_roles.verAdmin], controlProducto.editarProducto);
api.put('/productostock/:idproducto',[md_autenticacion.Auth, md_roles.verAdmin], controlProducto.stockProducto);
api.get('/buscarnombreproducto', [md_autenticacion.Auth, md_roles.verCliente],controlProducto.BusquedaNombre);



module.exports = api;