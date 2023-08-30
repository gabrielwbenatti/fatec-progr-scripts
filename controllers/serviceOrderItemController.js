const serviceOrderItem = require('../models/serviceOrderItem');

exports.getAll = (req, res) => {
    serviceOrderItem.findAll({
        order: [
            ['descricao', 'ASC']
        ]
    }).then(serviceOrderItem => {
        res.render('serviceOrderItem/index', { services: services });
    })
}

exports.novo = (req, res) => {
    res.render('serviceOrderItem/new');
}

exports.save = (req, res) => {
    var descricao = req.body.descricao;
    var valor = req.body.valor;

    serviceOrderItem.findOne({
        where: {
            descricao: descricao
        }
    }).then(serviceOrderItem => {
        if (serviceOrderItem == undefined) {
            serviceOrderItem.create({
                descricao: descricao,
                valor: valor
            }).then(() => {
                res.redirect('/serviceOrderItem');
            })
        }
        else {
            res.redirect('/serviceOrderItem');
        }
    })
}

exports.getserviceOrderItemService = (req, res) => {
    var id = req.params.id;

    serviceOrderItem.findByPk(id).then(service => {
        res.render('serviceOrderItem/editar', {
            service: {
                id: id,
                descricao: serviceOrderItem.descricao,
            }
        });
    });
}

exports.edit = (req, res) => {
    var id = req.body.id;
    var descricao = req.body.descricao;

    serviceOrderItem.update({
        descricao: descricao
    },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/serviceOrderItem');
        });
}

exports.delete = (req, res) => {
    var id = req.params.id;

    serviceOrderItem.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/serviceOrderItem');
    });
}
