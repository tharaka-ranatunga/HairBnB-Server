/**
 * Created by tharaka_ra on 7/5/2017.
 */
var db = require('../dbconnect');

exports.insertUser = function (callback) {
    // var post  = {firstname:'me', lastname:'you', email:'hi', password:'yes'};
    // db.query('INSERT INTO user (firstName, lastName , email, password) VALUES (?,?,?,?)', ['ytfyf','gfhgfg','jugf','fhgg'], function(err, rows) {
    db.query('select * from user', function(err, rows) {
        if (err) throw err;
        return callback(rows);
    });
};