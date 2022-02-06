

const { User } = require("../DAOS");
const { verifyJwtAndLoadPayload } = require ("../services/auth");
const badRequestError = require("../errors/badRequestError");
const notFoundError = require("../errors/notFoundError");

module.exports = async (req, res, next) => {
    const privateUrls = ["/profile", "/users", "/task"];

    if (privateUrls.some((privateUrl) => req.url.includes(privateUrl))) {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                throw badRequestError ("jwt requerido");
            }

            const splitString = authorization.split (" ");
            const token = splitString[1];

            let payload;

            try {
                payload = await verifyJwtAndLoadPayload (token);
            }catch (err) {
                throw badRequestError ("token invalido");
            }
            const now = new Date();
            const nowInMiliseconds = now.getTime();

            if (nowInMiliseconds <= payload.iat) {
                throw badRequestError ("toekn expirado");
            }

            const user = await User.getUserById (payload.userId);

            if (!user) {
                throw notFoundError (`usuario ${payload.userId} no encontrado`);
            }

            req.user = user.id;
            next();
        }catch (err) {
            res.status (403).send ({
                message: "operacion no autorizada",
                detail: err.message,
            });
        }
        
    } else {
        next();
    }
};