/**
 * Created by tharaka_ra on 7/13/2017.
 */
var model = require('../models');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
const config = require('../config');

module.exports= {
    signup : function(req, res) {
        model.user.findOrCreate({

            where: {
                email: req.body.email
            },
            defaults: {
                firstname: req.body.first,
                lastname: req.body.last,
                email: req.body.email,
                password: passwordHash.generate(req.body.password),
                location_id: 1,
                profilepic : null,
                profilebannerpic : null,
                verify : false,
                role_id : 2


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

    signin : async function(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        try {
            let user = await model.user.findOne({
                where: {
                    email: email
                }
            });
            if (user == null) {
                return res.status(404).send("This email is not associated with any account");
            }
            if (passwordHash.verify(req.body.password, user.password)) {
                var first_name = user.firstname;
                var token = jwt.sign({email: user.email}, config.key, {
                    expiresIn: 60 * 60 * 24   //Token expire in 24 Hours
                });
                return res.status(200).send({first_name: first_name, email: email, token: token, role: 1});
            } else {
                return res.status(401).send("Invalid credentials");
            }
        }catch(err){
            return res.status(500).send("server error");
        }

        // model.user.findOne({
        //     where: {
        //         email: email
        //     }
        // }).then(function(user){
        //     if(user==null){
        //         return res.status(404).send("This email is not associated with any account");
        //     }
        //
        //     if(passwordHash.verify(req.body.password,user.password)) {
        //         var first_name = user.firstname;
        //         var token = jwt.sign({email : user.email}, config.key,{
        //             expiresIn: 60*60*24   //Token expire in 24 Hours
        //         });
        //         return res.status(200).send({first_name:first_name, email : email, token : token, role: 1});
        //     }else{
        //         return res.status(401).send("Invalid credentials");
        //     }
        // }).catch(function(err){
        //     return res.status(500).send("server error");
        // });
    },
};
