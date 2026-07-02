const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FalsePositiveRecord = sequelize.define(
    'FalsePositiveRecord',
    {
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

        similarity_score: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        status: {
            type: DataTypes.STRING,
            defaultValue: 'needs_review'
        }
    },
    {
        tableName: 'false_positive_records',
        timestamps: true
    }
);

module.exports = FalsePositiveRecord;