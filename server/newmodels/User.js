const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
})
module.exports = User;