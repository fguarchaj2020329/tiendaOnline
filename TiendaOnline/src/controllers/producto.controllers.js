const producto = require('../models/producto.model');

function agregarProducto(req, res){

    const parametros = req.body;
    const modeloProducto = new producto();

    if(parametros.nombreProducto && parametros.cantidad && parametros.precio){
         
        modeloProducto.nombreProducto = parametros.nombreProducto;
        modeloProducto.proveedor = parametros.proveedor;
        modeloProducto.cantidad = parametros.cantidad;
        modeloProducto.precio = parametros.precio;
        modeloProducto.categoria = parametros.categoria;

        modeloProducto.save((err, productoGuardado) =>{

            if(err) return res.status(500).send({mensaje: "Error en la peticion"});
            if(!productoGuardado) return res.status(500).send({mensaje: "Error al agregar producto"});

            return res.status(200).send({mensaje: productoGuardado})
        })
    }else{
        return res.status(400).send({mensaje: "Ingresa los parametros obligatorios"})
    }
}

function obtenerProducto(req, res){

    producto.find({}, (err, productoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"})
        if(!productoEncontrado) return res.status(500).send({mensaje: "Error al obtener los productos"})
        return res.status(200).send({producto: productoEncontrado})
    })
}

function editarProducto(req, res){
    var idproducto = req.params.idproducto;
    var parametros = req.body;

    producto.findByIdAndUpdate(idproducto, parametros, {new: true}, (err, productoEditado) =>{
   
        if(err) return res.status(500).send({ mensaje: "Error en la petcion"})
        if(!productoEditado) return res.status(500). send({mensaje: "Error al editar producto"});

        return res.status(200).send({ producto: productoEditado})
    })
}
  

function stockProducto(req, res){
    const idproducto = req.params.idproducto;
    const parametros = req.body;

    producto.findByIdAndUpdate(idproducto, { $inc: {cantidad: parametros.cantidad}}, {new: true},(err, stockproducmod)=>{
        if(err) return res.status(500).send({ mensaje: "Error en la petcion"})
        if(!stockproducmod) return res.status(500). send({mensaje: "Error al editar producto"});

        return res.status(200).send({ stock: stockproducmod})
    })
}

function BusquedaNombre(req, res) {
    var parametrosbody = req.body;

    producto.find({ nombreProducto: {$regex: parametrosbody.nombre, $options: "i" } }, (err, proEmcontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!proEmcontrado) return res.status(500)
            .send({ mensaje: 'Error al obtener los datos'})

        return res.status(200).send({ producto: proEmcontrado })
    })
}

module.exports = {
    agregarProducto,
    obtenerProducto,
    editarProducto,
    stockProducto,
    BusquedaNombre

}