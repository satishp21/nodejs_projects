const Sequelize = require('sequelize');
const sequelize = new Sequelize('expense','root','S@tishpa2001', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;