const express = require('express');
const router = express.Router();
const Curso = require('../models/cursos');
const mongoose = require('mongoose');

//Rotas para adicionar cursos
router.post('/', (req, res, next) =>{

    const curso = new Curso({
        _id: new mongoose.Types.ObjectId(),
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco:req.body.preco
    });
    curso.save()
    .then(result =>{
        res.status(201).json({
            produtoCriado: curso
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//Listando um unico registro
router.get('/:cursoId', (req, res, next)=>{
    const id = req.params.cursoId;
    Curso.findById(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
});

//listando todos os cursos
router.get('/', (req, res, next)=>{
    const curso = Curso.find({})
    //const id = req.params.cursoId;
    //Curso.findById(id)
    .exec()
    .then(curso => {
        res.status(201).json({
            message: 'Todos os cursos',
            cursos: curso
        });
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
});

//rota para delete
router.delete('/:cursoId', (req, res, next)=>{
    const id = req.params.cursoId;
    Curso.deleteOne({_id:id})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
});

//Rota para editar
router.put('/:cursoId', (req, res, next) =>{
    const id = req.params.cursoId;
    const curso = new Curso({
        _id: req.params.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco:req.body.preco
    });
        Curso.updateOne({_id:id}, curso)
    .exec()
    .then(result =>{
        res.status(201).json({
            message: 'atualizado com sucesso',
            cursoatualizado: curso
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});




module.exports = router;