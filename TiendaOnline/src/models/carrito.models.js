const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = Schema({
    nombreProducto: String,
    cantidad: Number,
    precioUnit: Number,
    subtotal: Number,
    total: Number
})

module.exports = mongoose.model('Carritos', carritoSchema)