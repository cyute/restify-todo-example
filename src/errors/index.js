const errors = require('restify-errors');

module.exports = () => {
    errors.makeConstructor('TodoNotFoundError', {
        statusCode: 404,
        message: 'TODO cannot be found.'
    });

    errors.makeConstructor('TodoMalformedError', {
        statusCode: 422
    });
}