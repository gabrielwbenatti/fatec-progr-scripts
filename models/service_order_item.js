const Sequelize = require('sequelize')
const connection = require('../database/database')

const ServiceOrder = require('./service_order')
const Service = require('./service')

const ServiceOrderItem = connection.define(
    'service_order_items',
    {
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        acrescimo: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        desconto: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        valor: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        observacao: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
)

ServiceOrderItem.belongsTo(ServiceOrder)
ServiceOrderItem.belongsTo(Service)

// ServiceOrderItem.sync({force: true})

module.exports = ServiceOrderItem