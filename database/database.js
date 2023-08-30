const Sequelize = require('sequelize');

const connection = new Sequelize(
    'petshop', // nome do banco
    'root', //usuario do bd
    '1234', //senha do bd
    {
        host: 'localhost',
        dialect: 'mariadb',
        timezone: '-03:00'
    }
); 

module.exports = connection;  