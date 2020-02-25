const _ = require('underscore');
const mongo = require('../model/model');

const Usuario = require('../schema/usuario');

const getApp = (req, res) => {
    console.log("holas")
    res.send('hola mundo');
}

const getUser = (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    const all = {estado: true};

    const count = Usuario.count(all, (errConteo, conteo) => { 
        console.log('count');
    mongo.getUsuarios(all, desde, limite)
        .then((usuarios) => {
            res.json({
                ok: true,
                message: 'listado de usuarios',
                usuarios,
                conteo
        });
        }).catch((err) =>{
            res.json({
                ok: false,
                message: 'error al traer usuarios',
                err,
                errConteo
            });
        });   
    });          
}

const postUser = (req, res) => {
    let body = req.body;
    mongo.saveUser(body)
        .then((body) =>{
            res.json({
                ok: true,
                message: 'usuario insertado',
                usuario: body
            });
        }).catch((err) =>{
            res.json({
                ok: false,
                message: 'error al insertar usuario',
                err
            });
        });
}

const putUser = (req, res) => {
    let arrayValido = ['nombre', 'email', 'img', 'role', 'estado'];
    let id = req.params.id;
    let body = _.pick(req.body, arrayValido);

    mongo.updateUserById(id, body)
    .then((body) =>{
        res.json({
            ok: true,
            message: 'usuario actualizado',
            usuario: body
        });
    }).catch((err) =>{
        res.json({
            ok: false,
            message: 'usuario no actualizado',
            err
        });
    });
}

const deleteUser = (req, res) => {
    let  id = req.params.id;
    const estado = {estado: false};

    mongo.deleteUserById(id,estado)
        .then((id)=>{
            res.json({
                id: id.id,
                estado: id.estado,
                error: false,
                message: 'usuario borrado'
            });
        }).catch((err) =>{
            res.status(400).json({
                id: id,
                estado: estado,
                error: true,
                err,
                message: 'error al eliminar'
            });
        });
}
module.exports = {
    getApp,
    getUser,
    postUser,
    putUser,
    deleteUser
}