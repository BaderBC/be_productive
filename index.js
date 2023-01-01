require('dotenv').config();
require('./services/postgres.service');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSlash = require('express-slash');

const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

const { checkIfLoggedIn } = require('./services/authorization.middleware');

const indexController = require('./controllers/index.controller');
const addController = require('./controllers/add.controller');
const authController = require('./controllers/auth.controller');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', indexController);
app.use('/add', checkIfLoggedIn, addController);
app.use('/auth', authController);

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(expressSlash());


(async () => {
    server.listen(PORT, () => {
        console.info(`Server is listening on port: ${PORT}...`);
    });
})();