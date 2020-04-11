const {
    getAllProducts,
    getProductById,
    postCreateProd,
    updateProductById,
    deleteProductById,
    getyfindProductByTerm
} = require('../model/product-model');
const _ = require('underscore');
const Producto = require('../schema/producto');

const getProducts = async(req, res) => {
    let all = { disponible: true };
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    // console.log('desde: ', desde, "/ limite: ", limite);
    // desde.parseInt(desde);
    // limite.parseInt(limite);
    await getAllProducts(all, desde, limite)
        .then((productoDB) => {
            return res.json({
                err: false,
                productoDB
            });
        })
        .catch((e) => {
            return res.json({
                error: true,
                message: 'no se pudo traer productos',
                e
            });
        });
}

const getProduct = async(req, res) => {
    const id = req.params.id;
    await getProductById(id).then((productoDB) => {
        return res.json({
            err: false,
            productoDB
        });
    }).catch((e) => {
        return res.json({
            error: true,
            message: 'no se pudo traer productos',
            e
        });
    });
}

const getFindProducts = async(req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    let regexTermino = { nombre: regex };

    await getyfindProductByTerm(regexTermino).then((productoDB) => {
        res.json({
            err: false,
            message: 'todo bien',
            productoDB
        });
    }).catch((e) => {
        res.json({
            err: true,
            message: 'no se encontro nada',
            error: e
        });
    });
}

const postCreateProduct = async(req, res) => {

    let body = req.body;
    let usuarioDB = req.usuario;
    let id = req.params.id;
    await postCreateProd(body, usuarioDB, id).then((productoDB) => {
        return res.json({
            err: false,
            productoDB
        });
    }).catch((e) => {
        return res.json({
            error: true,
            message: 'err al crear producto',
            e
        });
    });
}

const updateProduct = async(req, res) => {
    let id = req.params.id;
    let newBody = [
        'nombre',
        'precioUni',
        'categoria',
        'descripcion',
        'disponible'
    ];
    let body = _.pick(req.body, newBody);
    await updateProductById(id, body).then((productoDB) => {
        return res.json({
            productoDB
        });
    }).catch((e) => {
        return res.status(400).json({
            error: 'no se pudo modificar',
            message: e
        });
    });
}

const deleteProduct = async(req, res) => {
    let id = req.params.id;
    const disponible = { disponible: false };
    await deleteProductById(id, disponible).then((productoDB) => {
        return res.json({
            err: false,
            message: 'elemento eliminado',
            productoDB
        })
    }).catch((e) => {
        return res.status(400).json({
            err: true,
            message: 'error al borrar',
            e
        })
    })
}
module.exports = {
    getProducts,
    getProduct,
    postCreateProduct,
    updateProduct,
    deleteProduct,
    getFindProducts
}