const Usuario = require('../schema/usuario');
const bcrypt = require('bcrypt');

const objUser = (body) =>{

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password,10),
        role: body.role
    }); 
    return usuario;
}

module.exports = {
    objUser
}