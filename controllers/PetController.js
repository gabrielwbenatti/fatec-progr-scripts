const Customer = require('../models/customer');
const Pet = require('../models/pet');

exports.getAll = (req, res) => {
    Pet.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(pets => {
        res.render('pets/index', { pets: pets });
    })
}

exports.novo = (req, res) => { 
    Customer.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then (customers => { res.render('pets/novo', {customers: customers})
})
   
}

exports.salvar = (req, res) => {
    let nome = req.body.nome;
    let idade = req.body.idade;
    let raca = req.body.raca;
    let especie = req.body.especie;
    let customerId = req.body.customerId

    Pet.findOne({
        where: {
            nome: nome,
            customerId : customerId
        }
    }).then(pet => {
        if (pet == undefined) {
            Pet.create({
                nome: nome,
                idade: idade,
                raca: raca,
                especie: especie,
                customerId: customerId
            }).then(() => {
                res.redirect('/pets');
            })
        }
        else {
            res.redirect('/pets');
        }
    })
}

exports.getPet = (req, res) => {
    var id = req.params.id;

    Pet.findByPk(id).then(pet => {
        res.render('pets/editar', {
            pet: {
                id: id,
                descricao: pet.descricao,
            }
        });
    });
}

exports.editar = (req, res) => {
    var id = req.body.id;
    var descricao = req.body.descricao;

    Pet.update({
        descricao: descricao
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/pets');
        });
}

exports.excluir = (req, res) => {
    var id = req.params.id;

    Pet.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/pets');
    });
}