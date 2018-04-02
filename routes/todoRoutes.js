const errors = require('restify-errors');
const Todo = require('../models/todo');

module.exports = (server) => {

    server.post("/todo", (req, res, next) => {
        const todo = new Todo({...req.body});

        if (!todo.task || todo.task.length <= 0) {
            return next(new errors.TodoMissingTaskError());
        }

        todo.save(function (err) {
            if (err) {
                console.error("Error creating Todo", err);
                return next();
            }
        });
        res.send(todo);
        next();
    });

    server.get("/todo/:id", (req, res, next) => {
        const id = req.params.id;

        Todo.findById(id, function(err, todo) {
            if (err) {
                console.error("Error getting Todo", err);
                return next(new errors.TodoNotFoundError());
            }

            if (!todo) {
                return next(new errors.TodoNotFoundError());
            }
            res.send(todo);
            return next();
        });
    });

    server.put("/todo/:id", (req, res, next) => {
        const id = req.params.id;

        Todo.findByIdAndUpdate(id, {...req.body}, function(err, todo) {
            if (err) {
                console.error("Error updating Todo", err);
                return next(new errors.TodoNotFoundError());
            }

            if (!todo) {
                return next(new errors.TodoNotFoundError());
            }
            res.send(todo);
            next();
        });
    });

    server.del("/todo/:id", (req, res, next) => {
        const id = req.params.id

        Todo.findByIdAndRemove(id, function(err, todo) {
            if (err) {
                console.error("Error deleting Todo", err);
                return next(new errors.TodoNotFoundError());
            }

            if (!todo) {
                return next(new errors.TodoNotFoundError());
            }
            res.send(204);
            next();
        });
    });
};