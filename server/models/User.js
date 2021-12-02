const Sequelize = require('sequelize');
const db = require('../config/database');
const User = db.define('user', {
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
    }
})

module.exports = User;