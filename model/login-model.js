const Usuario = require('../schema/usuario');

const getEmailUserMongo = (body) => {
    console.log(body.email)
    const usuarioDB = Usuario.findOne({ email: body.email });
    return usuarioDB;
}

const getUserGoogle = async(googleUser) => {
    
    const usuarioDB = await Usuario.findOne({ email : googleUser.email });
    return usuarioDB;
}

module.exports = {
    getEmailUserMongo,
    getUserGoogle
}