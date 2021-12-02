const Sequelize = require('sequelize');
const db = require('../config/database');
const Fridge = db.define('fridges', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,      
    },
    room: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    deviceid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true      
    },
})

module.exports = Fridge;