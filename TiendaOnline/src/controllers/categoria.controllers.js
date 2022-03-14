const categoria = require('../models/categoria.model');
const producto = require('../models/producto.model')

function agregarCategorias(req, res){
    const parametros = req.body;
    const modCategoria = new categoria();

    if(parametros.categoria){
         
        modCategoria.nombreCategoria = parametros.categoria;

        modCategoria.save((err, categoriaGuardada)=>{
            if(err) return res.status(500).send({mensaje: "Error en la peticion"});
            if(!categoriaGuardada) return res.status(500).send({mensaje: "Error al agregar producto"});

            return res.status(200).send({mensaje: categoriaGuardada})
        })
    }else{
        return res.status(500).send({mensaje: "Tienes que ingresar los campos obligatorios"})
    }
    
}

function visualizarCatedorias(req, res){

    categoria.find({}, (err, obteberCategorias)=>{

        if(err) return res.status(500).send({mensaje: "Error en la peticion"})
        if(!obteberCategorias) return res.status(500).send({mensaje: "Error al obtener las categorias"})
        return res.status(200).send({categoria: obteberCategorias})
    })
}

function editarCategoria(req, res){

    const idcategoria = req.params.idcategoria;
    const parametros = req.body;

    categoria.findByIdAndUpdate(idcategoria, parametros, {new: true}, (err, categoriaEditada)=>{
        if(err) return res.status(500).send({ mensaje: "Error en la petcion"})
        if(!categoriaEditada) return res.status(500). send({mensaje: "Erro al editar producto"});

        return res.status(200).send({ categoria: categoriaEditada})
    })

}


function eliminarCategoria(req, res) {
    const categoriaId = req.params.idcategoria;

    producto.findByIdAndUpdate(categoriaId, {categoria: 'por defecto'}, {new: true}, (err, productoEditado) =>{
   
        if(err) return res.status(500).send({ mensaje: "Error en la petcion"})
        if(!productoEditado) return res.status(500). send({mensaje: "Error al editar producto"});

        return res.status(200).send({ producto: productoEditado})
    })

    categoria.findByIdAndDelete(categoriaId, (err, categoriaEliminada)=>{
        if(err) return res.status(400).send({ mensaje: "Error en la peticion"});
        if(!categoriaEliminada) return res.status(400).send({mensaje: "Error al eliminar la empresa"});

        return res.status(200).send({categoria: categoriaEliminada})
    })
  }

  function BusquedaNombre(req, res) {
    var parametrosbody = req.body;

    categoria.find({ nombreCategoria: {$regex: parametrosbody.nombre, $options: "i" } }, (err, proEmcontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!proEmcontrado) return res.status(500)
            .send({ mensaje: 'Error al obtener los datos'})

        return res.status(200).send({ producto: proEmcontrado })
    })
}

module.exports = {
    agregarCategorias,
    visualizarCatedorias,
    editarCategoria,
    eliminarCategoria,
    BusquedaNombre
}