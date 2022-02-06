const { getTasksForUserDAO } = require("../../DAOS/Task");
const { taskView } = require("../../views/taskView");

async function getTasks(req, res) {
    try {
        const userId = req.user;
        console.log(userId);
        const tasks = await getTasksForUserDAO(userId);
        res.json(tasks.map(taskView));
    } catch (err) {
        console.log(err);
        res.status(500).send("Error de sistema", err);
    }
}

module.exports = getTasks;