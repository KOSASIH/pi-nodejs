const helmet = require('helmet');

const securityMiddleware = (app) => {
    app.use(helmet());
};

module.exports = securityMiddleware;
