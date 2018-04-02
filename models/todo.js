const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: String,
    task: String
});

module.exports = mongoose.model('Todo', todoSchema);