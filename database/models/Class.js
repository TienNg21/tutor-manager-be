const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Class = db.define('class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        field: 'user_id'
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'student_id'
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
        field: 'updated_at'
    }
}, {
    timestamps: false
})

module.exports = Class;