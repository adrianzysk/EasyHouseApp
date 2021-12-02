const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const Switch = sequelize.define('switch', {
     deviceid: {
        type: Sequelize.INTEGER,
        unique: true,
        model: 'devices', 
          key: 'devicesid',
    }, 
    isOn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})
module.exports = Switch;