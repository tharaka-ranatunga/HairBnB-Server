/**
* Created by tharaka_ra on 7/5/2017.
*/
// var mysql = require('mysql');
//
// var connection = mysql.createConnection({
//     host : "localhost",
//     name : "root",
//     password : "",
//     database : "test"
//     }
// )
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
//
// module.exports= connection;
//
// sequelize
//     .authenticate()
//     .then(() => {
//     console.log('Connection has been established successfully.');
// })
// .catch(err => {
//     console.error('Unable to connect to the database:', err);
// });

var Sequelize = require('sequelize');

const connection = new Sequelize('hairbnb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

// connection.authenticate().then(() => {console.log('Connection has been established successfully.');}).catch(err => {console.error('Unable to connect to the database:', err);});

module.exports = connection;