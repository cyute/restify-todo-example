const errors = require('restify-errors');

const todos = new Map();
let count = 1;

module.exports = (server) => {

    server.post("/todo", (req, res, next) => {
        const todo = {...req.body, id: count};
        if (!todo.task || todo.task.length <= 0) {
            return next(new errors.TodoMissingTaskError());
        }
        todos.set(count, todo);
        count++;
        res.send(todo);
        next();
    });

    server.get("/todo/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        const todo = todos.get(id);
        if (!todo) {
            return next(new errors.TodoNotFoundError());
        }
        res.send(todo);
        return next();
    });

    server.put("/todo/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        let todo = todos.get(id);
        if (!todo) {
            return next(new errors.TodoNotFoundError());
        }
        todo = {...req.body, id};
        todos.set(count, todo);
        res.send(todo);
        next();
    });

    server.del("/todo/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        let todo = todos.get(id);
        if (!todo) {
            return next(new errors.TodoNotFoundError());
        }
        todos.delete(parseInt(req.params.id));
        res.send(204);
        next();
    });
};