const Sequelize = require('sequelize');
const db = require('../config/db.config');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
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
    citizenId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
    },
    gender: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    openToWork: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    newEmail: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
    },
    confirmToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
    },
    resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    }
})

module.exports = User;