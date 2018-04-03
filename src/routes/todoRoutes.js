const errors = require('restify-errors');
const assert = require('assert');
const Todo = require('../models/todo');

const PATH = '/todo';

module.exports = (server) => {

    server.post(PATH, createTodo);
    server.get(`${PATH}/:id`, findTodo);
    server.put(`${PATH}/:id`, updateTodo);
    server.del(`${PATH}/:id`, deleteTodo);
    server.get(PATH, findAllTodos);

    async function createTodo(req, res, next) {
        try {
            const todo = await Todo.create({...req.body});
            res.send(todo);
            next();
        }
        catch(error) {
            console.error(error.message);
            next(new errors.TodoMalformedError(error.message));
        }
    }

    async function findTodo(req, res, next) {
        const id = req.params.id;

        try {
            const todo = await Todo.findById(id);
            assert.notStrictEqual(todo, null);
            res.send(todo);
            next();
        }
        catch (error) {
            console.error(error.message);
            next(new errors.TodoNotFoundError());
        }
    }

    async function findAllTodos(req, res, next) {
        try {
            const todos = await Todo.find({});
            assert.notStrictEqual(todos, null);
            res.send(todos);
            next();
        }
        catch (error) {
            console.error(error.message);
            next(500);
        }
    }

    async function updateTodo(req, res, next) {
        const id = req.params.id;

        try {
            const todo = await Todo.findByIdAndUpdate(id, {...req.body});
            assert.notStrictEqual(todo, null);
            res.send(todo);
            next();
        }
        catch (error) {
            console.error(error.message);
            next(new errors.TodoNotFoundError());
        }
    }

    async function deleteTodo(req, res, next) {
        const id = req.params.id;

        try {
            const todo = await Todo.findByIdAndRemove(id);
            assert.notStrictEqual(todo, null);
            res.send(204);
            next();
        }
        catch (error) {
            console.error(error.message);
            next(new errors.TodoNotFoundError());
        }
    }
};