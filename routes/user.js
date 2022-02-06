//const req = require("express/lib/request")

const controllerAuth = require("../controllers/auth");
const authMiddleware = require("../middlewares/authMiddlewareApp");


const user = (router) => {
    
    router.post("/signUp", controllerAuth.signUp);
    router.post("/login", controllerAuth.login);
    router.get("/profile",  authMiddleware, controllerAuth.profile);
    router.get("/users", controllerAuth.findAllUsers);

    
};

module.exports = user;