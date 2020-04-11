const Categoria = require('../schema/categoria');

const newCategorie = (body) =>{
    console.log('--------------body: ', body);
    let objCategorie = new Categoria ({
        categoria: body.categoria
    });
    console.log('objCategorie: ',objCategorie)
    return objCategorie
}

module.exports = {
    newCategorie
}