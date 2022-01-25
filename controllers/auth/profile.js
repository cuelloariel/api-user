const { User } = require("../../db/models");
const { verify } = require("../../services/auth");


module.exports = async (req, res) => {
   // res.json(req.user); 
   try{
        const { authorization } = req.headers;
        
        if(!authorization){
            throw { code: 403, message: "token necesario"};
        }
        const splitString = authorization.split(" ");
        
        const token = splitString[1];
   
        const payload = await verify(token);
       
        
        const now = new Date();
       
        const nowInMiliseconds = now.getTime();
        

        if (nowInMiliseconds <= payload.iat){
            throw { code: 403, message: "jwt expirado"};
        }
        
        const user = await User.findByPk(payload.userId);

        res.send({ code: 200, user});
   } catch (err) {
        return res.status(err.code || 500).send({
        message: "error de sistema",
        detail: err.message,
        });
   }
}