
const {
    createTask,
    getTasks,
} = require("../controllers/task");

const task = (router) => {
    router.post ("/task", createTask);

    router.get("/task", getTasks);

    router.get("/:id", () => {
        //TODO
    });

    router.put("/:id", () => {
        //TODO
    });

    router.delete("/:id", () => {
        //TODO
    });
};

module.exports = task;