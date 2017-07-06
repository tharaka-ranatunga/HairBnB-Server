/**
 * Created by tharaka_ra on 7/4/2017.
 */
var user = require('../models/user');
var passwordHash = require('password-hash')

var password = passwordHash.generate('encrypted')



module.exports= {
    getView: function (req, res) {
        res.render('', { title: 'Express' });

    },
    viewJson: function (req, res) {
        res.json({name:'yes'});

    },
    insert: function(req,res){
        var post  = {
            firstname:req.body.first,
            lastname:req.body.last,
            email:req.body.email,
            password: req.body.password
        };
        user.insertUser(function (name) {
            return res.json({message:name});
        },post);

    },

};
