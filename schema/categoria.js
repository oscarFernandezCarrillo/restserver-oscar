const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex')

const Schema = mongoose.Schema;
const categoriaSchema = new Schema({
    categoria: {
        type: String
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es a la de ahuevo']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);