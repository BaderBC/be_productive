const cors = require('cors');

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['X-Requested-With,Content-Type', 'Access-Control-Allow-Origin', 'Origin'],
    credentials: true
};

module.exports = {
    corsMiddleware: cors(corsOptions)
};