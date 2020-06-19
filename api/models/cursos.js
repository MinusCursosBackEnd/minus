const mongoose = require('mongoose');

const cursoSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    titulo: String,
    descricao: String,
    preco: Number
});

module.exports = mongoose.model('Curso', cursoSchema);