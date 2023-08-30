const Sequelize = require('sequelize')
const connection = require('../database/database')

const Customer = require('./customer')

const Pet = connection.define(
    'pets',
    {
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        idade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        raca: {
            type: Sequelize.STRING,
            allowNull: false
        },
        especie: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }
)

Pet.belongsTo(Customer)

// Pet.sync({force: true})

module.exports = Pet