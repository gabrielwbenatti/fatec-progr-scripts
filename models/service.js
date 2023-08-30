const Sequelize = require('sequelize')
const connection = require('../database/database')

const Service = connection.define(
    'services',
    {
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        valor: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }
)
 
// Service.sync({force: true})

module.exports = Service