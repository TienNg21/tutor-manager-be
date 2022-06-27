const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Province = db.define('province', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
})

module.exports = Province;