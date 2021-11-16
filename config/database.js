const config = {

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA_BASE,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000

}

const promise = require('bluebird');

let options = { promiseLib: promise };

let pgp = require('pg-promise')(options);
const db = pgp(config);

module.exports = { db }
