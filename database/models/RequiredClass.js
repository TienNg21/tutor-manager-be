const Sequelize = require('sequelize');
const db = require('../config/db.config');

const RequiredClass = db.define('requiredClass', {
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
    minSalary: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    maxSalary: {
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
        allowNull: true,
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    isPublish: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    }
})

module.exports = RequiredClass;