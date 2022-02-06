
const req = require("express/lib/request");
const { createTaskDAO } = require("../../DAOS/Task");
const badRequestError = require("../../errors/badRequestError");

async function createTask (req, res) {
    try {
        const { description } = req.body;
        const userId = req.user;

        if (!description) {
            return res.status(400).send (badRequestError("Por favor ingrese una descripción"));
        }
        const task = await createTaskDAO ({ description });
        res.json(task);
    } catch (err) {
        console.log (err);
        res.status(500).send("Error de sistema", err);
    }
}

module.exports = createTaskDAO;