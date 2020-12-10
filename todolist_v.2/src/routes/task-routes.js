const { Router } = require("express");
const Task = require("../service/task-service");
const { requireUser } = require("../middleware/autho");

const taskRouter = Router({ mergeParams: true });

/**
 * them middleware yeu cau xac thuc tai khoan
 * khi nguoi dung tuong tac voi todo-list item
 */
taskRouter
    .route("/:id", )
    .all(requireUser)
    .get((req, res) => {
        if (!req.params.id)
            return res.status(400).json({ message: "id is requestted" });
        Task.getTaskById(req.params.id)
            .then((task) => {
                res.json(task);
            })
            .catch((error) => res.status(500).send(error));
    });

taskRouter
    .route("/")
    .all(requireUser)
    .get((req, res) => {
        //req = request, res = respon
        Task.getAll(req.user._id)
            .then((tasks) => {
                res.json(tasks);
            })
            .catch((error) => res.status(500).send(error));
    })
    .post((req, res) => {
        console.log(req.body);
        if (Array.isArray(req.body)) {
            // let createdTask = [];
            // req.body.forEach(element => {
            //     const { title, body } = element;
            //     createdTask = [...createdTask,Task.addTask({ title, body })];
            // });
            // res.json(createdTask);
        } else {
            const { title, body } = req.body;
            if (!title || typeof title !== "string")
                return res
                    .status(400)
                    .json({ message: "title is requested and its type is string" });
            const authorid = req.user._id
            Task.addTask({ title, body, authorid })
                .then((task) => res.json(task))
                .catch((error) => res.status(500).send(error));
        }
    })
    .patch((req, res) => {
        const { _id, title, body, completed } = req.body;
        const id = _id;
        if (!id) return res.status(400).json({ message: "id is requestted" });

        if (!title && !body && completed === null && !completedAt)
            return res.status(420).json({ message: "not thing to update" });

        if (completed != false && completed != true) {
            return res.status(420).json({ message: "completed is not boolean" });
        }

        Task.upDate({ id, title, body, completed })
            .then((task) => {
                res.json(task);
            })
            .catch((error) => res.status(500).send(error));
    })
    .delete((req, res) => {
        if (!req.body._id)
            return res.status(400).json({ message: "id is requestted" });

        Task.deleteTaskById(req.body._id)
            .then((task) => {
                res.json(task);
            })
            .catch((error) => res.status(500).send(error));
    });

module.exports = taskRouter;