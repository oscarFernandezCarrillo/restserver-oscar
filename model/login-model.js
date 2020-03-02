const Usuario = require('../schema/usuario');

const getUserLogin = async(body) => {
    const usuarioDB = await Usuario.findOne({ email: body.email });
    return usuarioDB;
}

module.exports = {
    getUserLogin
}