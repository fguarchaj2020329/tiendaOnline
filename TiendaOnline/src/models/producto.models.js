const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = Schema({

    nombreProducto: String,
    proveedor: String,
    cantidad: Number,
    precio: Number,
    categoria: String

})

module.exports = mongoose.model('Productos', productoSchema)