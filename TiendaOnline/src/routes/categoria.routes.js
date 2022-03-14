const express = require('express');
const controlCategorrias = require('../controllers/categoria.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarcategoria', [md_autenticacion.Auth, md_roles.verAdmin], controlCategorrias.agregarCategorias);
api.get('/visualizarcategorias', [md_autenticacion.Auth, md_roles.verAdmin], controlCategorrias.visualizarCatedorias);
api.put('/editarcategoria/:idcategoria', [md_autenticacion.Auth, md_roles.verAdmin], controlCategorrias.editarCategoria);
api.delete('/eliminarCategoria/:idcategoria', [md_autenticacion.Auth, md_roles.verAdmin], controlCategorrias.eliminarCategoria);
api.get('/buscarcategoria', [md_autenticacion.Auth, md_roles.verCliente], controlCategorrias.BusquedaNombre);




module.exports = api;