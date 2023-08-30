const Services = require('../models/service');

exports.getAll = (req, res, next) => {
    Services.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(services => {
        res.render('services/index', { services: services });
    })
}

exports.novo = (req, res, next) => {
    res.render('services/novo');
}

exports.salvar = (req, res) => {
    const descricao = req.body.descricao;
    const valor = req.body.valor;

    Services.findOne({
        where: {
            descricao: descricao
        }
    }).then(service => {
        if (service == undefined) {
            Services.create({
                descricao: descricao,
                valor: valor
            }).then(() => {
                res.redirect('/services');
            })
        }
        else {
            res.redirect('/services');
        }
    })
}

exports.getService = (req, res, next) => {
    const id = req.params.id;

    Services.findByPk(id).then(service => {
        res.render('services/editar', { service: service });
    });
}

exports.alterar = (req, res, next) => {
    let id = req.body.id
    let descricao = req.body.descricao

    Services.update({
        descricao: descricao
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/services')
        })
}

exports.excluir = (req, res, next) => {
    let id = req.params.id

    Services.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/services')
    })
}
