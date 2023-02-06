const mysql = require('mysql');

var pool = mysql.createPool({
    multipleStatements: true,
    "user": "root",
    "password": "",
    "database": "internet_banking",
    "host": "localhost",
    "port": 3306,
    
});


exports.pool = pool