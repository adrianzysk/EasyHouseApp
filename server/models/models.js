const Sequelize = require('sequelize');
const sequelize = new Sequelize('SmartHouse', 'postgres', 'JUWvMc~y[wX<2.9J', {
    host: '127.0.0.1',
    dialect:  'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
});

const models = {
    User: sequelize.import('./User'),
    Switch: sequelize.import('./Switch'),
    Thermometer: sequelize.import('./Thermometer'),
    Fridge: sequelize.import('./Fridge'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
})
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports =  models;
