const Sequelize = require('sequelize');
const db = require('../config/database');
const Thermometer = db.define('thermometer', {
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
        defaultValue: false,
    },
    deviceid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        defaultValue: -1  
    },
})

module.exports = Thermometer;