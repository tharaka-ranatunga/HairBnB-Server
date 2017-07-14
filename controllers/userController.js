/**
 * Created by tharaka_ra on 7/13/2017.
 */
var model = require('../models');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports= {
    signup : function(req, res) {
        model.user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                first_name: req.body.first,
                last_name: req.body.last,
                email: req.body.email,
                password: passwordHash.generate(req.body.password),
                promotion: req.body.promotion,
                role: req.body.role,

            }
        }).spread(function(user, created){
            if(created){
                return res.json({status : "success"});
            }
            console.log('fail');
            return res.json({error : "User already exist", status : "fail"});
        }).catch(function(err){
            return res.status(500);
        });
    },

    signin : function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        model.user.findOne({
            where: {
                email: email
            }
        }).then(function(user){
            if(user==null){
                return res.status(404).send("This email is not associated with any account");
            }

            if(passwordHash.verify(req.body.password,user.password)) {
                var token = jwt.sign({email : user.email}, config.key,{
                    expiresIn: 60*60*24   //Token expire in 24 Hours
                });
                return res.status(200).send({email : email, token : token});
            }else{
                return res.status(401).send("Invalid credentials");
            }
        }).catch(function(err){
            return res.status(500).send("server error");
        });
    },
};
