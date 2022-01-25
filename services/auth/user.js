const { User } = require("../../db/models");

async function createUser(parametros) {
    try{
        return await User.create(parametros);
    } catch (err) {
        console.log(err);
        throw {
            code: 500,
            message: "La base de datos rompio"
        };
    }
}


module.exports = { createUser }