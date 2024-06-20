const { createPool } = require('mysql2/promise');
const config = require('./../config');

const pool = createPool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

const getConnection = () => {
    return pool;
}

module.exports = {
    getConnection
}
