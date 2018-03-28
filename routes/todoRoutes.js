const errors = require('restify-errors');

const todos = new Map();
let count = 0;

module.exports = (server) => {

    server.post("/todo", (req, res, next) => {
        count++;
        const todo = {...req.body, id: count};
        todos.set(count, todo);
        res.send(todo);
        next();
    });

    server.get("/todo/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        const todo = todos.get(id);
        if (!todo) {
            return next(new errors.NotFoundError({ message: `TODO with id ${id} cannot be found.` }));
        }
        res.send(todo);
        return next();
    });

    server.put("/todo/:id", (req, res, next) => {
        const id = parseInt(req.params.id);
        let todo = todos.get(id);
        if (!todo) {
            return next(new errors.NotFoundError({ message: `TODO with id ${id} cannot be found.` }));
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
            return next(new errors.NotFoundError({ message: `TODO with id ${id} cannot be found.` }));
        }
        todos.delete(parseInt(req.params.id));
        res.send(204);
        next();
    });
};