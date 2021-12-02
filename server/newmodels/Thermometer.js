const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const Thermometer = sequelize.define('thermometer', {
     deviceid: {
        type: Sequelize.INTEGER,
        unique: true,
        model: 'devices',
          key: 'devicesid',
    }, 
    value: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
})
module.exports = Thermometer;