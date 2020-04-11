const Producto = require('../schema/producto');

const newProducto =  async(usuarioDB, body, id) => {
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria:  body.categoria,
        usuario: usuarioDB._id
    });
    return producto;
}

const validateProducto = async(productoDB, body) =>{
        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.disponible = body.disponible;
        productoDB.categoria = body.categoria;
        productoDB.usuario = body.usuario;
    return productoDB
}
module.exports = {
    newProducto,
    validateProducto
}