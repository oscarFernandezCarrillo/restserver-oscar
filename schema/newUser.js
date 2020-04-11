const Usuario = require('./usuario');
const bcrypt = require('bcrypt');

const objUser = (body) => {
    console.log('--------------F: objUser - body: ', body);
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        google: body.google,
        img: body.img,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    return usuario;
}

const newGoogleUser = (googleUser) => {
    console.log('--------------F: newUser - newGoogleUser: ', googleUser);
    let usuario = new Usuario({
        nombre: googleUser.nombre,
        email: googleUser.email,
        img: googleUser.imagen,
        google: googleUser.google,
        password: 'C:'
    });
    console.log('F: newUser - usuario: ', usuario);
    return usuario;
}

module.exports = {
    objUser,
    newGoogleUser
}