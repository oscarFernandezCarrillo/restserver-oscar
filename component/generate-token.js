var jwt = require('jsonwebtoken');

const getToken = (usuarioDB) => {
    let token = jwt.sign({ data: usuarioDB, }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
    return token;
}

module.exports = {
    getToken
}