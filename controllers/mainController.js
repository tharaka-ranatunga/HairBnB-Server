/**
 * Created by tharaka_ra on 7/4/2017.
 */
var user = require('../models/user');
// var values = [
//     {firstName:'demian', lastName: 'demian@gmail.com', email: 'demian@gmail.com', password: 1},
//     {firstName:'john'  , lastName: 'demian@gmail.com', email: 'john@gmail.com'  , password: 2},
//     {firstName:'mark'  , lastName: 'demian@gmail.com', email: 'mark@gmail.com'  , password: 3},
//     {firstName:'pete ' , lastName: 'demian@gmail.com', email: 'pete@gmail.com'  , password: 4}
// ];

var post  = {
    firstname:'Demian',
    lastname:'Martin',
    email:'demianmartin@gmail.com',
    password:'encrypted'
};

module.exports= {
    getView: function (req, res) {
        res.render('', { title: 'Express' });

    },
    viewJson: function (req, res) {
        res.json({name:'yes'});

    },
    insert: function(req,res){
        user.insertUser(function (name) {
            return res.json({message:name});
        },post);

    },

};
