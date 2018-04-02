const restify = require('restify');
const config = require('config-yml');

const database = require('./src/database');
const routes = require('./src/routes/index');
const errors = require('./src/errors/index');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

errors();
routes(server, config);
database(config);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});