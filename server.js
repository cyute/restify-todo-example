const restify = require('restify');
const routes = require('./routes/index');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

routes(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});