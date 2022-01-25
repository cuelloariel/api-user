module.exports = (req, res, next) => {
    console.log("Hola estamos en un middleware de aplicacion");
    next();
}