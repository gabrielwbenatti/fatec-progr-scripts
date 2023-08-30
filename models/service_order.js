const Sequelize = require('sequelize')
const connection = require('../database/database')

const Pet = require('./pet')

const ServiceOrder = connection.define(
    'service_orders',
    {
        dataRealizacao: {
            type: Sequelize.DATE,
            allowNull: false
        },
        subtotal: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        acrescimos: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        descontos: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }
)

ServiceOrder.belongsTo(Pet)

// ServiceOrder.sync({force: true})

module.exports = ServiceOrder