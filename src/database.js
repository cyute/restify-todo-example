const mongoose = require('mongoose');

module.exports = (config) => {
    const mongoDb = 'mongodb://' + config.mongoUrl;
    mongoose.connect(mongoDb);

    mongoose.connection.on('error', console.error.bind(console, 'Connection error!!'));
    mongoose.connection.once('open', () => console.log('connected to', mongoDb));
};