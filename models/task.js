const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    deadline: {
        type: String,
        required: false
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;