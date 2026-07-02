const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DuplicateRecord = sequelize.define('DuplicateRecord', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    reason: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'duplicate_records',
    timestamps: true
});

module.exports = DuplicateRecord;