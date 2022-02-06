const { User } = require("../db/models");
const { verifyJwtAndLoadPayload } = require("../services/auth");
const badRequestError = require("../errors/badRequestError");
const notFoundError = require("../errors/notFoundError");


module.exports = async (req, res) => {
     
    try{
         const { authorization } = req.headers;
         
         if(!authorization){
             throw badRequestError ("jwt necesario");
         }

         const splitString = authorization.split(" ");
         
         const token = splitString[1];
    
         let payload;

         try {
            payload = await verifyJwtAndLoadPayload(token);
         } catch (err) {
             throw badRequestError("token invalido");
         }
         
        
         
         const now = new Date();
        
         const nowInMiliseconds = now.getTime();
         
 
         if (nowInMiliseconds <= payload.iat){
             throw badRequestError("jwt expirado");
         }
         
         const user = await User.findByPk(payload.userId);

         if (!user) {
             throw notFoundError(`usuario ${payload.userId} no encontrado`);
         }
 
         req.user = user;
         
         next();

    } catch (err) {
         res.status(err.code || 500).send({
         message: "error de sistema",
         detail: err.message,
         });
    }
 }