require('dotenv').config();
require('./services/postgres.service');
const path = require('path');

const express = require('express');
const CORS = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSlash = require('express-slash');

const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

const { checkIfLoggedIn } = require('./services/authorization.middleware');
const { corsMiddleware } = require('./services/cors.service');

const indexController = require('./controllers/index.controller');
const activitiesController = require('./controllers/activities.controller');
const authController = require('./controllers/auth.controller');


app.use(corsMiddleware);
app.use((req, res, next) => {
    console.log('Body', req.body);
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/auth', authController);
app.use('/activities', checkIfLoggedIn, activitiesController);
//app.use(expressSlash());
app.use('/', checkIfLoggedIn, indexController);


//app.use(express.static(path.resolve(__dirname, 'public')));


(async () => {
    console.clear();
    server.listen(PORT, () => {
        console.info(`Server is listening on port: ${PORT}...`);
    });
})();
