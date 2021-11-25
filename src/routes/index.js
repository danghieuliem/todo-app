const { Router } = require("express");
const tasksRouter = require("./task-routes");
const usersRouter = require("./user-routes");

const router = Router({ mergeParams: true });

router.use("/tasks", tasksRouter);
router.use("/users", usersRouter);


module.exports = router;