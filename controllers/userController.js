/**
 * Created by tharaka_ra on 7/13/2017.
 */
var sequelize = require('sequelize');
var model = require('../models');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var config = require('../config/jwt-config');

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
            console.log('Error occured: ', err);
            return res.json({error : "Server error occurred", status : "fail"});
        });
    },
    signin : function(req, res) {
        console.log(req.body.email);
        console.log(req.body.password);
        model.user.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(user){
            if(user==null){
                return res.json({error : "No matching account with this email", status : "fail"});
            }

            if(passwordHash.verify(req.body.password,user.password)) {
                var token = jwt.sign({email : user.email}, config.key,{
                    expiresIn: 60*60*24   //Token expire in 24 Hours
                });

                return res.json({
                    error: "Login Success",
                    status: "success",
                    token:token,
                    email: req.body.email
                });
            }
            return res.json({error : "Invalid Credentials", status : "fail"});
        }).catch(function(err){
            console.log('Error occured: ', err);
            return res.json({error : "Server error occurred", status : "fail"});
        });
    },
};