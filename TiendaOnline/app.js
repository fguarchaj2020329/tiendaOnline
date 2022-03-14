const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRutas = require('./src/routes/usuario.routes');
const ProductoRutas = require('./src/routes/producto.routes');
const CategoriaRutas = require('./src/routes/categoria.routes');
const CarritoRutas = require('./src/routes/carrito.routes')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRutas, ProductoRutas, CategoriaRutas, CarritoRutas);

module.exports = app;