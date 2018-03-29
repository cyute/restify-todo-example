const todoRoutes = require('./todoRoutes');
const versionRoutes = require('./versionRoutes');

module.exports = function(server, config) {
    todoRoutes(server);
    versionRoutes(server, config);
};