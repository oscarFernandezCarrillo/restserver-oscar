//================================
//------------Puerto--------------
//================================

process.env.PORT = process.env.PORT || 3000;

//================================
//------------Entorno-------------
//================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================================
//---------Base de Datos----------
//================================
let urlDB;
if( process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
    // urlDB = 'mongodb+srv://-NAME-:-PASS-@cluster0-q0xls.mongodb.net/-DB-';
    urlDB2 = 'mongodb+srv://-name-:-pass-@cluster0-q0xls.mongodb.net/-BD-?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB
