const jwt = require('./jwt');
const user = require("./user");

module.exports = {
    getJWT : jwt.getJWT,
    verify : jwt.verifyJWT,
    createUser: user.createUser,
};