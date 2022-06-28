const Sequelize = require('sequelize');
const db = require('../config/db.config');

const User = db.define('users', {
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
        field: 'citizen_id'
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'phone_number'
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
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
        field: 'open_to_work'
    },
    newEmail: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        field: 'new_email'
    },
    confirmToken: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'confirm_token'
    },
    resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        field: 'reset_password_token'
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

module.exports = User;