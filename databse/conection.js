const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('find-pet', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
module.exports = sequelize