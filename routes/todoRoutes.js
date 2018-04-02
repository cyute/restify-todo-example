const errors = require('restify-errors');
const Todo = require('../models/todo');

const PATH = '/todo';

module.exports = (server) => {

    server.post(PATH, createTodo);
    server.get(`${PATH}/:id`, findTodo);
    server.put(`${PATH}/:id`, updateTodo);
    server.del(`${PATH}/:id`, deleteTodo);
    server.get(PATH, findAllTodos);

    function createTodo(req, res, next) {
        const todo = new Todo({...req.body});

        todo.save(error => {
            if (error) {
                console.error(error.message);
                return next(new errors.TodoMissingTaskError(error.message));
            }
            res.send(todo);
            next();
        });
    };

    function findTodo(req, res, next) {
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
    };

    function findAllTodos(req, res, next) {
        Todo.find({}, (error, todos) => {
            if (error) {
                console.error(error.message);
                return next(500);
            }
            res.send(todos);
            next();
        });
    };

    function updateTodo(req, res, next) {
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
    };

    function deleteTodo(req, res, next) {
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
    };
};