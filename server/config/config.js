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
// if( process.env.NODE_ENV === 'dev'){
//     urlDB = 'mongodb://localhost:27017/cafe';
// }else{
    urlDB = 'mongodb+srv://atlas-admin:MCrSU6FoPNvsw4K3@cluster0-q0xls.mongodb.net/cafe?retryWrites=true&w=majority';
//     //urlDB = 'mongodb+srv://atlas-admin:MCrSU6FoPNvsw4K3@cluster0-q0xls.mongodb.net/cafe';
// }

process.env.URLDB = urlDB
