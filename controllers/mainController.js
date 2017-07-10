/**
 * Created by tharaka_ra on 7/4/2017.
 */
var sequelize = require('../dbconnect');
var user = require('../models/user');
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
        sequelize.sync().then(function(err) {
            //insert new user
            user.create({
                first_name:'d',
                last_name:'d',
                email:'s',
                password: 's'
            }).success(function(user) {
                //you can now access the newly created user via the variable user
                console.log(user);
                res.send(user);
            }).catch(function(err){
                console.log('Error occured: ', err);
            });
        });
    }

};
