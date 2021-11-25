const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const router = require("./routes");

const app = express();
const port = process.env.port || 3000;


/**
 * mongoose
 */

mongoose.connect(
    "mongodb+srv://danghieuliem:01682210219@cluster0.6yarb.mongodb.net/todo-app?retryWrites=true&w=majority", { useNewUrlParser: true }
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
//*************** */

app.use(express.json());

app.use(express.static(path.join(__dirname, "web")));

app.use("/api", router);

// app.get("/tasks/:id", (req, res) => {
//     if (!req.params.id)
//         return res.status(400).json({ message: "id is requestted" });
//     Task.getTaskById(req.params.id)
//         .then((task) => { res.json(task) })
//         .catch((error) => res.status(500).send(error));
// });

// app.get("/tasks", (req, res) => { //req = request, res = respon
//     Task.getAll()
//         .then((tasks) => { res.json(tasks) })
//         .catch((error) => res.status(500).send(error));
// });

// app.post("/tasks", (req, res) => {
//     if (Array.isArray(req.body)) {
//         // let createdTask = [];
//         // req.body.forEach(element => {
//         //     const { title, body } = element;
//         //     createdTask = [...createdTask,Task.addTask({ title, body })];
//         // });
//         // res.json(createdTask);
//     } else {
//         const { title, body } = req.body;
//         if (!title || typeof(title) !== "string")
//             return res.status(400).json({ message: "title is requested and its type is string" });

//         Task.addTask({ title, body })
//             .then((task) => res.json(task))
//             .catch((error) => res.status(500).send(error));
//     }
// });

// app.patch("/tasks", (req, res) => {
//     const { _id, title, body, completed, completedAt, createdAt } = req.body;
//     const id = _id;
//     if (!id)
//         return res.status(400).json({ message: "id is requestted" });

//     if (!title && !body && !completed && !completedAt)
//         return res.status(420).json({ message: "not thing to update" });

//     if (completed != false &&
//         completed != true) {
//         return res.status(420).json({ message: "completed is not boolean" });
//     }

//     Task.upDate({ id, title, body, completed, completedAt, createdAt })
//         .then((task) => { res.json(task) })
//         .catch((error) => res.status(500).send(error));
// });

// app.delete("/tasks/:id", (req, res) => {
//     if (!req.params.id)
//         return res.status(400).json({ message: "id is requestted" });

//     Task.deleteTaskById(req.params.id)
//         .then((task) => { res.json(task) })
//         .catch((error) => res.status(500).send(error));
// })

app.listen(port, () => {
    console.log("http://localhost:" + port);
});