const mysql = require("mysql2")

const pool = mysql.createpool({
    host : "localhost",
    hser : "root",
    database:"node-complete",
    password:"nodecomplete"
})

module.exports = pool.promise();