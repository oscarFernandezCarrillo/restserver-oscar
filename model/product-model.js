const Producto = require('../schema/producto');
const { validateProducto, newProducto } = require('../schema/validateObjec');

const getAllProducts = async(all, desde, limite) => {
    // console.log('desde: ', desde, "/ limite: ", limite);
    let productoDB = await Producto.find(all)
        .sort('categoria')
        .populate('usuario', 'nombre, emeail')
        .populate('categoria', 'categoria')
        .skip(desde)
        .limit(limite);
    return productoDB;
}

const getProductById = async(id) => {
    let productoDB = Producto.findById(id);
    return productoDB;
}
const getyfindProductByTerm = async(termino) => {
    let productoDB = Producto.find(termino)
        .populate('categoria', 'nombre');
    return productoDB;
}

const postCreateProd = async(body, usuarioDB, id) => {
    console.log('body -----', body)
    console.log('usuarioDB ----', usuarioDB)

    let producto = await newProducto(usuarioDB, body, id);
    console.log(producto)
    const productoDB = await producto.save();
    return productoDB;
}

const updateProductById = async(id, body) => {

    let productoDB = await getProductById(id);
    let validateProductoDB = await validateProducto(productoDB, body);
    let saveProductoDB = await Producto.findByIdAndUpdate(id, validateProductoDB, { new: true });
    productoDB = {
        productoDB,
        saveProductoDB
    }
    return productoDB;
}

const deleteProductById = async(id, disponible) => {
    let productoDB = await Producto.findByIdAndUpdate(id, disponible, { new: true, runValidators: true });
    return productoDB;
}

module.exports = {
    getAllProducts,
    getProductById,
    postCreateProd,
    updateProductById,
    deleteProductById,
    getyfindProductByTerm
}