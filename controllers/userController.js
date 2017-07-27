/**
 * Created by tharaka_ra on 7/13/2017.
 */
const model = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
// Create a schema


module.exports= {
    signup : async function(req, res) {
        let schema = new passwordValidator();
        schema
            .is().min(5)                                    // Minimum length 8
            .is().max(100)                                  // Maximum length 100
            .has().uppercase()                              // Must have uppercase letters
            .has().lowercase()                              // Must have lowercase letters
            .has().digits()                                 // Must have digits
            .has().not().spaces()                           // Should not have spaces
            .is().not().oneOf(['Passw0rd', 'Password123']);

        let email = req.body.email;
        let password = req.body.password;
        if(!emailValidator.validate(email)){
            return res.status(400).json({error:"Email not valid"})
        }
        if(!schema.validate(password)){
            return res.status(400).json({error:"Password not valid"})
        }
        let user = await model.user.findOrCreate({

            where: {
                email: email
            },
            defaults: {
                firstname: req.body.first,
                lastname: req.body.last,
                email: req.body.email,
                password: passwordHash.generate(password),
                location_id: 1,
                profilepic : null,
                profilebannerpic : null,
                verify : false,
                role_id : 2


            }
        });
        if(user[1]){
            return res.status(200).json({message : "Success"});
        }else{
            return res.status(409).json({error : "User already exist"})}
    },

    signin : async function(req, res) {
            let email = req.body.email;
            let password = req.body.password;

            try {
                if(!emailValidator.validate(email)){
                    return res.status(400).json({error:"Email not valid"})
                }

                let user = await model.user.findOne({
                    where: {
                        email: email
                    }
                });

                if (user == null) {
                    return res.status(400).send({error :"This email is not associated with any account" });
                }
                if (passwordHash.verify(req.body.password, user.password)) {
                    var first_name = user.firstname;
                    var token = jwt.sign({email: user.email}, config.key, {
                        expiresIn: 60 * 60 * 24   //Token expire in 24 Hours
                    });
                    return res.status(200).json(
                            {
                                first_name: first_name,
                                email: email,
                                token: token,
                                role: 1
                            }
                    );
                } else {
                    return res.status(401).json({error :"Invalid credentials"});
                }
            }catch(err){
                return res.status(500).json({error : "Server error"});
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
