const pgp = require('pg-promise')();


const {
    DATABASE_URL = "postgresql://localhost/be_productive"
} = process.env;

global.db = pgp(DATABASE_URL);