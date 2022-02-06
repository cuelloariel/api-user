
'use strict';

const {
    Model,
    DataTypes
} = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate (models) {
            Task.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'userId',
            });
        }
    };
    Task.init ({
        description: DataTypes.STRING, 
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Task',
        paranoid: true,
    
    });
    console.log("creando base Tasks");
    return Task;
}