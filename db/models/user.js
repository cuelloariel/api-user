"use strict";

const {Model, DataTypes} = require("sequelize");
const { sequelize } = require(".");
const bcrypt = require("bcryptjs")

module.exports = (sequelize, DataTypes) => {

    class User extends Model {
        static associate(){}
    }

    User.init({
        first_name:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
 
     
    {
        sequelize,
        modelName: "User",
    }
    );

    //User.addScope("defaultScope", {
      //  attributes: {exclude: ["password"]},
   // });

    User.beforeCreate(cambiarContraseña);

    return User;
};

function cambiarContraseña(user){
    if(user.changed('password')){
        user.password = encriptarContraseña(user.get("password"));
    }
}

function encriptarContraseña(contraseña){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(contraseña, salt);

}