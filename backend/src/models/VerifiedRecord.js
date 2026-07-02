const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VerifiedRecord = sequelize.define('VerifiedRecord', {
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
        allowNull: false,
        unique: true
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {
    tableName: 'verified_records',
    timestamps: true
});

module.exports = VerifiedRecord;