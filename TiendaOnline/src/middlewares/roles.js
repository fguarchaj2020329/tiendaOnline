
exports.verAdmin = function(req, res, next) {
    if(req.user.rol !== "ADMIN") return res.status(403).send({mensaje: "Solo puede acceder el Administrador"})
    
    next();
}

exports.verCliente = function(req, res, next) {
    if(req.user.rol !== "Cliente") return res.status(403).send({mensaje: "Solo puede acceder el cliente"})
    
    next();
}