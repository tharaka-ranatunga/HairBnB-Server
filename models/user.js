/**
 * Created by tharaka_ra on 7/5/2017.
 */
// var db = require('../dbconnect');
//
//
//     exports.insertUser = function (callback,post) {
//         // var post  = {firstname:'me', lastname:'you', email:'hi', password:'yes'};
//         db.query('INSERT INTO user (firstName, lastName , email, password) VALUES (?,?,?,?)', [post.firstname,post.lastname,post.email,post.password], function(err, rows) {
//         // db.query('select * from user', function(err, rows) {
//             if (err) throw err;
//             return callback("success");
//         });
// };
var Sequelize = require('sequelize');
var connection = require('../dbconnect');

// const User = connection.define('user', {
//     first_name: Sequelize.STRING,
//     last_name: Sequelize.STRING,
//     email: Sequelize.STRING,
//     password: Sequelize.STRING
// })

module.exports = function(sequelize, DataTypes) {
    var User = connection.define('user', {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return User;
}



