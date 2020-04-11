const login = require('../model/login-model');
const { getToken } = require('../component/generate-token');

let validatedGoogleUser  = async(googleUser) =>{
    
    // let usuarioDB = googleUser;
    let res = {};
    let usuarioDB = await login.getEmailUserMongo(googleUser);

    let validateUserMongo = async(usuarioDB) =>{    
     if( usuarioDB != null){
            console.log('existe userdb')
            if(usuarioDB.google === false){
                console.log('error 400');
                return res.status(400).json({
                    err: true,
                    mesage: 'debe usar su autenticación normal'
                });
            }else{
                console.log('-----------------primer else---code 200---------------------------')
                let token = getToken(usuarioDB)
                    let respuesta = {
                        err: false,
                        usuario: usuarioDB,
                        token
                    };
                    return respuesta;
            }
        }
    }
    let validateUserDB = await validateUserMongo(usuarioDB);
    return validateUserDB;
}
module.exports = {
    validatedGoogleUser
}