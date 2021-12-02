const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const Device = sequelize.define('device', {
    deviceid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      room: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      }
})
module.exports = Device;


