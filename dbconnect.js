/**
 * Created by tharaka_ra on 7/5/2017.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : "localhost",
    name : "root",
    password : "",
    database : "test"
    }
)
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports= connection;