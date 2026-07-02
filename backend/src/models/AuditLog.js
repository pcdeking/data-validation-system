const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditLog = sequelize.define('AuditLog', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

    message: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'audit_logs',
    timestamps: true
});

module.exports = AuditLog;