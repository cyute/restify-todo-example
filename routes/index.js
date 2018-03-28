// combine routes
const todoRoutes = require('./todoRoutes');

module.exports = function(server) {
    todoRoutes(server);
};