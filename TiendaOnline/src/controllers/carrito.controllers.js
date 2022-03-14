const carrito = require('../models/carrito.model');
const producto = require('../models/producto.model');
const pdfkit = require('pdfkit');
const fs = require('fs');

function agregarCompraAlCarrito(req, res){
  
    const parametros = req.body;

    producto.findOne({nombreProducto: parametros.nombreProducto}, (err, productoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!productoEncontrado) return res.status(500).send({mensaje: "Error al buscar producto"})

        const modelCarrito = new carrito();

        modelCarrito.nombreProducto = parametros.nombreProducto;
        modelCarrito.cantidad = parametros.cantidad;
        modelCarrito.precioUnit = productoEncontrado.precio;
 

        modelCarrito.save((err, compraGuardada) =>{
            if(err) return res.status(400).send({mensaje: "Error en la peticion"})
            if(!compraGuardada) return res.status(400).send({mensaje:"Error al agregar compra"})

          
             var  subtotalCarritoloc = compraGuardada.cantidad*productoEncontrado.precio;
             modelCarrito.subtotal = subtotalCarritoloc;

             var total = subtotalCarritoloc;
             modelCarrito.total = total;
              

          modelCarrito.save((err, compraGuardaa) =>{
            if(err) return res.status(400).send({mensaje: "erro en la peticion"})
            if(!compraGuardaa) return res.status(400).send({mensaje:"Error al agregar compra"})

            return res.status(200).send({compra: compraGuardaa});
          })

        })
    })


}

function obtenerfactura(req, res){
  const pdfDocument = new pdfkit
  pdfDocument.pipe(fs.createWriteStream("factura.pdf"));

  carrito.find({},(err, obtenercarrito)=>{
    if(err) return res.status(500).send({ mensaje: "Error al obtener"});
        if(!obtenercarrito) return res.status(500).send({mensaje : "Error al obtener curso"});

        let contenido =[]
        for(let i = 0; i< obtenercarrito.length; i++){

            contenido.push(obtenercarrito[i].nombreProducto+'               '+ 
                           obtenercarrito[i].cantidad+'                          '+  
                           obtenercarrito[i].precioUnit+'                     '+
                           obtenercarrito[i].subtotal+'\n'+'\n'+'\n')
        }

        pdfDocument.text("FATURA",{
          align: 'center',
      })

        pdfDocument.text("NOMBRE               CANTIDAD       PRECIO UNIT     SUBTOTAL ",{
      })

      pdfDocument.text("     "+'\n'+'\n',{
        align: 'center',
    })

      pdfDocument.text(contenido,{
        fit: [250,300], 
   
    })

    
    pdfDocument.text(obtenercarrito.total,{
      fit: [250,300], 
 
  })
      
          pdfDocument.end()
        return res.status(200).send({ carrito: obtenercarrito})
  })

}

module.exports = {
    agregarCompraAlCarrito,
    obtenerfactura
}