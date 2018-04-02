module.exports = (server, config) => {
    server.get("/version", (req, res, next) => {
        res.send(config.message);
        next();
    });
};