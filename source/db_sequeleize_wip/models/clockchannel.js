'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ClockChannel extends Model {
        static associate(models) {
            //  define associations here
        }
    };

    ClockChannel.init({
        channel_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: "clock_channel",
        modelName: "clock_channel",
        freezeTableName: true,
    });

    return ClockChannel;
}