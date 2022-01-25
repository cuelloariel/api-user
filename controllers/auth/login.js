//paso 1 verificar que el email, password llegan
//paso 1 verificar si el usuario existe con ese mail (User.findOne({where : {email}}))

//paso 3 devolver la informacion al front de ese usuario encontrado por
//hacer el ruteo

const { User } = require("../../db/models")
const bcrypt = require("bcryptjs")
const { getJWT } = require('../../services/auth');


module.exports = async (req, res) => {
    const { email, password} = req.body;

try {
    if (!email | !password) {
        throw { code: 403, message: "no se encontro usuario"};
        }

        //buscamos el usuario en la bd
        const user = await User.findOne({ where: {
            email
        }})

        

        if (!bcrypt.compareSync(password, user.password)){
            throw { code: 403, message: "password incorrecto"};
        }

        const token = getJWT({
            id: user.id,
            email: user.email,
        })

        res.send({ code: 200, user, token})

        
        res.send(user)

    }catch  (err) {
        return res.status(err.code || 500).send ({
            message: "error de sistema",
            detail: err.message,
        }); 
    }
}