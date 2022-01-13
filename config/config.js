require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME} = process.env;

module.exports = {
    development : {
        username: "postgres",
        password: "ariel" ,
        database: "postgres",
        host: "127.0.0.1",
        dialect: "postgres",
    }
};