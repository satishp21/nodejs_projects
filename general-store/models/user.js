const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Item = sequelize.define('item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ItemName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    Quantity: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
});


module.exports = Item;