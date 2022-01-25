//const req = require("express/lib/request")

const controllerAuth = require("../controllers/auth");


const user = (router) => {
    
    router.post("/signUp", controllerAuth.signUp);
    router.post("/login", controllerAuth.login);
    router.get("/profile", controllerAuth.profile);

    
};

module.exports = user;