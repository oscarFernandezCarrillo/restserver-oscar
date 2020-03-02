//================================
//--------Verificar-Token---------
//================================
var jwt = require('jsonwebtoken');

let verificarToken = async(req, res, next) => {
    let token = req.get('token');

    await jwt.verify(token, process.env.SEED, (err, decoded) => {
        console.log('Token: ', token);
        if (err) {
            res.status(401).json({
                error: true,
                err: err
            });
        }
        req.usuario = decoded.data;
        next();
    });
}

const verificarUser = async(req, res, next) => {
    let usuario = req.usuario;
    let resp = res;
    await console.log('usuario role: ', usuario.role)
    console.log('usuario: ', usuario)
    if (usuario.role === 'ADMIN_ROLE') {
        // res.json({
        //     error: false,
        //     message: 'Usuario con permisos de administrador'
        // });
        await next();
    } else {
        console.log('mal');
        return res.json({
            error: true,
            message: 'El Usuario no tiene permisos de administrador'
        });
    }
}
module.exports = {
    verificarToken,
    verificarUser
}