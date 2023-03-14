const mysql = require("mysql2")

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    database:"node-proj",
    password:"S@tishpa2001"
})

module.exports = pool.promise();