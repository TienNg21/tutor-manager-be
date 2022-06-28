const Sequelize = require('sequelize');
const db = require('../config/db.config');

const District = db.define('district', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    prefix: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    provinceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'province_id'
    }
}, {
    timestamps: false
})

module.exports = District;