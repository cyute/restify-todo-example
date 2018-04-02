const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: String,
    task: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);