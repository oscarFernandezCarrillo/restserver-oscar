const bcrypt = require('bcrypt');
const login = require('../model/login-model');
const { getToken } = require('../component/generate-token');

const useRouter = (req, res) => {
    const body = req.body;
    login.getUserLogin(body)
        .then((usuarioDB) => {
            console.log(body.password);
            console.log(usuarioDB.password);
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    error: true,
                    err: {
                        mesage: 'usuario o contraseña_ no validos'
                    }
                });
            } else if (!usuarioDB) {
                return res.status(400).json({
                    error: true,
                    err: {
                        mesage: '_usuario o contraseña no validos'
                    }
                });
            }

            let token = getToken(usuarioDB);
            return res.json({
                error: false,
                usuario: usuarioDB,
                token
            });
        }).catch((err) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    err
                });
            }
        });
}

module.exports = {
    useRouter
}