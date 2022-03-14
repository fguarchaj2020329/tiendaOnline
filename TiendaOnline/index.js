const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;                                                                  
mongoose.connect('mongodb://localhost:27017/TiendaOnline', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Conexion a la base de datos");

    app.listen(3000, function () {
        console.log("servidor Corriendo en el puerto ")
    })

}).catch(error => console.log(error));
