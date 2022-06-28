const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Ward = db.define('ward', {
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
    },
    districtId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'district_id'
    }
}, {
    timestamps: false
})

module.exports = Ward;