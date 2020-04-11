const Usuario = require('../schema/usuario');
const newUser = require('../schema/newUser');

const saveUser = async(body) => {
    console.log('function saveUser--body: ', body);
    const usuario = await newUser.objUser(body);
    console.log('function saveUser--usuario: ', usuario);
    const usuarioDB = await usuario.save();
    return usuarioDB;
}

const updateUserById = async(id, body) => {
    console.log(id);
    console.log(body)
    const usuarioDB = await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    console.log(usuarioDB);
    return usuarioDB;
}

const deleteById = async(id) => {
    const usuarioBorradoDB = await Usuario.findOneAndRemove(id(err));
    if (err) {
        return err;
    }
    return usuarioBorradoDB;
}

const deleteUserById = async(id, estado) => {
    const usuarioBorradoDB = await Usuario.findByIdAndUpdate(id, estado, { new: true });
    return usuarioBorradoDB;
}

const getUsuarios = async(all, desde, limite) => {
    console.log('getUsuarios.desde: ', desde)
    console.log('getUsuarios.limite: ', limite)
    const usuariosDB = await Usuario.find(all, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite);

    return usuariosDB
}

module.exports = {
    saveUser,
    updateUserById,
    getUsuarios,
    deleteById,
    deleteUserById
}