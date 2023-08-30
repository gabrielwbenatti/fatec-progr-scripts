const Sequelize = require('sequelize')
const connection = require('../database/database')

const Customer = connection.define(
    'customers',
    {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sobrenome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        celular: {
            type: Sequelize.STRING,
            allowNull: true
        },
        endereco: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }
)

// Customer.sync({force: true})

module.exports = Customer