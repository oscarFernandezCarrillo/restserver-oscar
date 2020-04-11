const Categoria = require('../schema/categoria');
const { newCategorie } = require('../schema/newCategorie')

const getCategoriesAll = async(all) => {
    let categoriesDB = await Categoria.find(all)
        .sort('categoria')
        .populate('usuario', 'nombre email');
    return categoriesDB;
}

const getCategorieByID = async(id) => {
    console.log(id)
    let categorieDB = await Categoria.findById(id);
    return categorieDB;
}

const createCategorie = async(body, usuarioDB) => {
    console.log('----------usuarioDB:', usuarioDB._id);
    let objCategorie = new Categoria({
        categoria: body.categoria,
        usuario: usuarioDB._id,
        nombre: usuarioDB.nombre,
        email: usuarioDB.email
    });
    let categorieDB = await objCategorie.save();
    console.log('categorieDB: ', categorieDB)
    return categorieDB;
}

const updateCetegorie = async(id, categoria) => {
    console.log('-id: ', id)
    console.log('-categoria: ', categoria)

    const categorieDB = await Categoria.findByIdAndUpdate(id, categoria, { new: true, runValidators: true });
    return categorieDB;
}

const deleteCategorie = async(id) => {
    const categorieDB = await Categoria.findByIdAndRemove(id)
    return categorieDB;
}
module.exports = {
    getCategoriesAll,
    getCategorieByID,
    createCategorie,
    updateCetegorie,
    deleteCategorie
}