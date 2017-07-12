/**
 * Created by tharaka_ra on 7/4/2017.
 */
var sequelize = require('sequelize');
var connection = require('../dbconnect');
// var user = require('../models/user')
var model = require('../models')



// connection.authenticate().then(() => {console.log('Connection has been established successfully.');}).catch(err => {console.error('Unable to connect to the database:', err);});

// var user = connection.define('user', {
//     first_name: sequelize.STRING,
//     last_name: sequelize.STRING,
//     email: sequelize.STRING,
//     password: sequelize.STRING
// }, {
//     classMethods: {
//         associate: function(models) {
//             // associations can be defined here
//         }
//     }
// });
var passwordHash = require('password-hash');


var password = passwordHash.generate('encrypted');


module.exports= {
    getView: function (req, res) {
        res.render('', { title: 'Express' });

    },
    viewJson: function (req, res) {
        res.json({name:'yes'});

    },
    // add: function(req,res){
    //     var post  = {
    //         firstname:req.body.first,
    //         lastname:req.body.last,
    //         email:req.body.email,
    //         password: req.body.password
    //     };
    //     user.insertUser(function (name) {
    //         return res.json({message:name});
    //     },post);
    //
    // },
    insert : function(req, res) {
        connection.sync().then(function(){
            model.user.findOrCreate({
                where: {
                    email: req.body.email
                },
                defaults: {
                    first_name: req.body.first,
                    last_name: req.body.last,
                    email: req.body.email,
                    password: req.body.password}
            }).spread(function(user, created){
                if(created){
                    return res.json({status : "success"});
                }
                console.log('fail');
                return res.json({error : "User already exist", status : "fail"});
            }).catch(function(err){
                console.log('Error occured: ', err);
                return res.json({error : "Server error occurred", status : "fail"});
            });
        }

    }

};
