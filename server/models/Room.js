const Sequelize = require('sequelize');

const connection = require('../util/database');

const Room = connection.define('room', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
});


module.exports = Room;