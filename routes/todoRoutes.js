const errors = require('restify-errors');
const Todo = require('../models/todo');

module.exports = (server) => {

    server.post("/todo", (req, res, next) => {
        const todo = new Todo({...req.body});

        todo.save(error => {
            if (error) {
                console.error(error.message);
                return next(new errors.TodoMissingTaskError(error.message));
            }
            res.send(todo);
            next();
        });
    });

    server.get("/todo/:id", (req, res, next) => {
        const id = req.params.id;

        Todo.findById(id, (error, todo) => {
            if (error) {
                console.error(error.message);
                return next(new errors.TodoNotFoundError(error.message));
            }

            if (!todo) {
                return next(new errors.TodoNotFoundError());
            }
            res.send(todo);
            next();
        });
    });

    server.put("/todo/:id", (req, res, next) => {
        const id = req.params.id;

        Todo.findByIdAndUpdate(id, {...req.body}, (error, todo) => {
            if (error) {
                console.error(error.message);
                return next(new errors.TodoNotFoundError(error.message));
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

        Todo.findByIdAndRemove(id, (error, todo) => {
            if (error) {
                console.error(error.message);
                return next(new errors.TodoNotFoundError(error.message));
            }

            if (!todo) {
                return next(new errors.TodoNotFoundError());
            }
            res.send(204);
            next();
        });
    });
};