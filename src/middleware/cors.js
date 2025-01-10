const cors = require('cors');

const corsOptions = {
    origin: 'https://your-frontend-domain.com', // Replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

const setupCors = (app) => {
    app.use(cors(corsOptions));
};

module.exports = setupCors;
