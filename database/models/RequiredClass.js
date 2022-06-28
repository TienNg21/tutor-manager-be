const Sequelize = require('sequelize');
const db = require('../config/db.config');

const RequiredClass = db.define('required_class', {
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
    minSalary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'min_salary',
    },
    maxSalary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'max_salary'
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
        field: 'user_id'
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'student_id'
    },
    isPublish: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_publish'
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

module.exports = RequiredClass;