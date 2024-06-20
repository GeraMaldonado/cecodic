const { config } = require('dotenv');
config();

module.exports = {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.DB_USER || "",
    password: process.env.PASSWORD || ""
};
