const {newGoogleUser} = require('../schema/newUser');
const {saveUser} = require('../model/model');
const login = require('../model/login-model');
const { getToken } = require('../component/generate-token');
const { validatedGoogleUser } = require('../component/login-component');

const bcrypt = require('bcrypt');
const CLIENT_ID = '1007203933988-lgpl4c1ei72h8t6lg13m6jt9cpf280gm.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


const useRouter = (req, res) => {
    const body = req.body;
    login.getEmailUserMongo(body)
        .then((usuarioDB) => {
            // console.log('body.pass: ', body.password);
            // console.log('userDb.pass: ',usuarioDB.password);
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
            console.log('status 200: ', usuarioDB)
            let token = getToken(usuarioDB);
            return res.json({
                error: false,
                usuario: usuarioDB,
                token
            });
        }).catch((err) => {
            if (err) {
                console.log('status 500')
                return res.status(500).json({
                    error: true,
                    err
                });
            }
        });
}


const verify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  

    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        imagen: payload.picture,
        google: true
    }
  }

const getGoogleToken = async(req, res)=>{
    let token = req.body.idtoken;
    let googleUser = await verify(token)
        .catch((err) => {
            return res.status(403).json({
                ok: false,
                err: err
            });
        });

        await validatedGoogleUser(googleUser).then((validateUserMongo)=>{
            return res.json({
                mesage: validateUserMongo
            });
        }).catch((e)=>{
            return res.json({
                err: true,
                mesage: e
            });
        });

        console.log('validar en mongo---');
        googleUser = await newGoogleUser(googleUser);

        let usuarioDB_ = await saveUser(googleUser).catch((err) =>{
            return res.json({
                mesage: err
            });
        });
        let newToken = await getToken(usuarioDB_);
        console.log('////////////////////res: ', newToken)
        return res.json({
            err: false,
            usuario: usuarioDB_,
            token: newToken
        });
                        


        


        
        // await saveUser(googleUser).then((usuarioDB_) =>{
        //     //console.log(' usuarioDB_ : ',usuarioDB_);
        //             getToken(usuarioDB_);
        //                 console.log('////////////////////res: ')
        //                 // return res.json({
        //                 //     err: false,
        //                 //     usuario: usuarioDB_,
        //                 //     token
        //                 // });
        //         }).catch((err) =>{
        //             console.log(err);
        //         }); 
        // }
        //}
}

module.exports = {
    useRouter,
    getGoogleToken
}