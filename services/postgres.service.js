const pgp = require('pg-promise')();

//TODO: complete code bellow
throw new Error('complete code bellow');

const {
    DATABASE_URL = ""
} = process.env;

global.db = pgp(DATABASE_URL);