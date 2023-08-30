const Customer = require('../models/customer');

exports.getAll = (req, res) => {
    Customer.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(customers => {
        res.render('customers/index', { customers: customers });
    })
}

exports.novo = (req, res) => {
    res.render('customers/novo');
}

exports.salvar = (req, res) => {
    let nome = req.body.nome
    let sobrenome = req.body.sobrenome
    let cpf = req.body.cpf
    let telefone = req.body.telefone

    Customer.findOne({
        where: {
            nome: nome
        }
    }).then(customer => {
        if (customer == undefined) {
            Customer.create({
                nome: nome,
                sobrenome: sobrenome,
                cpf: cpf,
                telefone: telefone
            }).then(() => {
                res.redirect('/customers');
            })
        }
        else {
            res.redirect('/customers');
        }
    })
}

exports.getOne = (req, res) => {
    var id = req.params.id;

    Customer.findByPk(id).then(customer => {
        res.render('customers/editar', {
            customer: {
                id: id,
                nome: customer.nome,
                sobrenome: customer.sobrenome,
                cpf: customer.cpf,
                telefone: customer.telefone
            }
        });
    });
}

exports.alterar = (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var cpf = req.body.cpf;
    var telefone = req.body.telefone;

    Customer.update({
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        telefone: telefone
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/customers');
        });
}

exports.excluir = (req, res) => {
    var id = req.params.id;

    Customer.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/customers');
    });
}
