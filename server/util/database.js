const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '890819', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
