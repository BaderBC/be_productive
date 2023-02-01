import * as pg_promise from 'pg-promise';
const pgp = pg_promise();

const { DATABASE_URL = 'postgresql://localhost/be_productive' } = process.env;

global.db = pgp(DATABASE_URL);
