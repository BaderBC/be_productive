require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const indexController = require('./controllers/index.controller');
const addController = require('./controllers/add.controller');


app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexController);
app.use('/add', addController);


(async () => {
    require('./services/postgres.service');

    server.listen(PORT, () => {
        console.info(`Server is listening on port: ${PORT}...`);
    });
})();