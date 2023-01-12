const cors = require('cors');

const origins = ['local']

const corsOptions = {
    origin: true,
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: true
};
//const CORS = cors(corsOptions);
const CORS = cors({
    origin: 'http://localhost:5173',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': true
});

module.exports = {
    corsMiddleware: CORS
};