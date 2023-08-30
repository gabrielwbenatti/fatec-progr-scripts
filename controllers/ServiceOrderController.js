const ServiceOrder = require('../models/service_order')
const Pet = require('../models/pet')
const Service = require('../models/service')

exports.getAll = (req, res) => {
    ServiceOrder.findAll({
        order: [
            ['id', 'DESC']
        ],
        include: [{
            model: Pet
        }]
    }).then(serviceOrders => {
        res.render('service-orders/index', { serviceOrders: serviceOrders })
    })
}

exports.novo = (req, res) => {
    Pet.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(pets => {
        Service.findAll({
            order:[
                ['descricao', 'ASC']
            ]
        }).then(services => {
            res.render('service-orders/novo', {pets: pets, services: services})
        })
    })

}

exports.salvar = (req, res) => {
    let id = req.body.id
    let dataRealizacao = req.body.dataRealizacao
    let subtotal = req.body.subtotal
    let acrescimos = req.body.acrescimos
    let descontos = req.body.descontos
    let total = req.body.total

    ServiceOrder.findOne({
        where: {
            id: id
        }
    }).then(serviceOrder => {
        if (serviceOrder == undefined) {
            ServiceOrder.create({
                dataRealizacao: dataRealizacao,
                subtotal: subtotal,
                acrescimos: acrescimos,
                descontos: descontos,
                total: total
            }).then(() => {
                res.redirect('/service-orders') 
            })
        } else { 
            res.redirect('/service-orders')
        }
    })
}

exports.getServiceOrder = (req, res) => {
    let id = req.body.id;

    ServiceOrder.findByPk(id).then(serviceOrder => {
        Pet.findAll({
            order: [
                ['nome', 'ASC']
            ]
        }).then(pets => {
            res.render('/service-orders/editar', { pets: pets })
        })
    })
}

exports.alterar = (req, res) => {
    let id = req.body.id
    let dataRealizacao = req.body.dataRealizacao
    let subtotal = req.body.subtotal
    let acrescimos = req.body.acrescimos
    let descontos = req.body.descontos
    let total = req.body.total

    ServiceOrder.update({
        dataRealizacao: dataRealizacao,
        subtotal: subtotal,
        acrescimos: acrescimos,
        descontos: descontos,
        total: total
    },
        {
            where: { id: id }
        }).then(() => {
            res.redirect('/service-orders')
        })
}

exports.excluir = (req, res) => {
    var id = req.params.id;

    ServiceOrder.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/service-orders');
    });
}
