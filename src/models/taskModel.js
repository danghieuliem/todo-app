const mongoose = require("mongoose");

//tao ra mot "doi tuong" gon thuoc tinh va kieu du lieu
const TaskSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
    authorid: String
});

//tao ra model voi "doi tuong" o tren 

const Task = mongoose.model("Task", TaskSchema) //"Task" la ten colletion the "s" vao duoi

module.exports = Task;