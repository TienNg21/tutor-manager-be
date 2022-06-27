const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Class = db.define('class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    province: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    district: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ward: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    }
})

module.exports = Class;