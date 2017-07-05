/**
 * Created by tharaka_ra on 7/4/2017.
 */
var user = require('../models/user');

module.exports= {
    getView: function (req, res) {
        res.render('', { title: 'Express' });

    },
    viewJson: function (req, res) {
        res.json({name:'yes'});

    },
    insert: function(req,res){
        user.insertUser(function (name) {
            return res.json({name:name});
        });

    },

};
