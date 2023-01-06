const cors = require('cors');


    const corsOptions = {
        origin: true,
        methods: [],
        allowedHeaders: [],
        exposedHeaders: [],
        credentials: true
    };
    const CORS = cors(corsOptions);

module.exports = {
    corsMiddleware: CORS
};