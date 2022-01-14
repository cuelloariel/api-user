const { send } = require("process");
const {User} = require("../../db/models");



module.exports = async (req,res) => {

    try {
        const { first_name, last_name, email, password } = req.body;

        if(!first_name || !last_name || !email || !password) {
            throw {code: 403, message : "Todos los campos son requeridos"};
        }

        const nuevoUsuario = await createUser({
            first_name, 
            last_name, 
            email, 
            password,
        });

        res.send( {
            status: 200,
            nuevoUsuario,
        });

    } catch (err) {
        return res.status(err.code || 500).send({
            message : "error de sistema",
            detail: err.message,

        })
    }
   // res.status(200).send({success: true});
};


async function createUser(parametros) {
    try {
        return await User.create(parametros);
    } catch (error) {
        throw {code: 500, message : "la base de datos rompio"};
    }
}