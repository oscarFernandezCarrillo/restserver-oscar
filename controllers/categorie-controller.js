const _ = require('underscore');
const modelCategorie = require('../model/categoria');
const { verificarToken } = require('../server/middlewares/autenticacion');



const getCategories = async(req, res) => {
    //let all = {__v : '0'};
    let all= {};
    await modelCategorie.getCategoriesAll(all).then((categorias) =>{
        return res.json({
            err: false,
            categorias
        });
    }).catch((err) => {
        res.json({
            error: true,
            message: 'error al traer categorias',
            err
        });
    });
}

const getCategorie = async(req, res) => {
    let id = req.params.id;
    await modelCategorie.getCategorieByID(id).then((categorie) => {
        res.json({
            err: false,
            categoria: categorie.categoria,
            nombre: categorie.nombre,
            email: categorie.email,
            idUser:  categorie.usuario
        });
    }).catch((err) => {
        res.json({
            error: true,
            message: 'error al traer categoria',
            err
        })
    });
}

const postCreateCategorie = async(req, res) => {
    let body = req.body;
    let usuarioDB = req.usuario;

    let categorie = await modelCategorie.createCategorie(body, usuarioDB).catch((e) =>{
        res.status(500).json({
            err: true,
            message: 'error el insertar nueva categoria',
            e
        })       
    });
    if(!categorie){
        res.status(400).json({
            err: true,
            message: 'problemas al insertar'
        });
    }else{
        res.json({
            err: false,
            categorie: categorie.categoria,
            nombre: categorie.nombre,
            idUser: categorie.usuario,
            email: categorie.email
        })
    }
}

const putUpdateCetegorie = async(req, res) => {
    console.log(req.body.categoria);
    let arrayValido = ['categoria'];
    let id = req.params.id;

    let body = _.pick(req.body, arrayValido);
    let categorieDB = await modelCategorie.updateCetegorie(id,body).catch((e) =>{
        return res.status(500).json({
            err: true,
            message: 'error el modificar categoria',
            e
        })       
    });
    if(!categorieDB){
        return  res.status(400).json({
            err: true,
            message: 'problema al modificar'
        });
    }
    return res.json({
        err: false,
        categorie: categorieDB.categoria,
        nombre: categorieDB.nombre,
        idUser: categorieDB.usuario,
        email: categorieDB.email
    })
}

const deleteCategorie = async(req, res) => {
    let role = req.usuario.role;
    let id = req.params.id;
    console.log('-role: ', role)

    if(role === 'ADMIN_ROLE'){
        let categorieDB = await modelCategorie.deleteCategorie(id).catch((e) =>{
            res.status(500).json({
                err: true,
                message: 'error el eliminar--',
                usuario: req.usuario.nombre,
                e
            });
        });
        console.log(categorieDB)
        if(!categorieDB){
            res.status(400).json({
                err: true,
                message: 'error el eliminar',
                usuario: req.usuario.nombre
            });
        }
        return res.json({
            err: true,
            message: 'categoria eliminada con exito!!!',
            categoria: categorieDB.categoria,
            usuario: categorieDB.nombre
        });
    }
    res.json({
        err: true,
        message: 'No cuenta con los permisos suficientes',
        usuario: req.usuario.nombre
    });
}
module.exports = {
    getCategories,
    getCategorie,
    postCreateCategorie,
    putUpdateCetegorie,
    deleteCategorie
}