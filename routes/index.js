var express = require('express');
var router = express.Router();
var mainC = require('../controllers/mainController');
var userC = require('../controllers/userController');
var searchC = require('../controllers/searchController');
var profileC = require('../controllers/profileController');
var passport = require('../middleware/passport');

/* GET home page. */

router.get('/',mainC.getView);
router.post('/signup', userC.signup);
router.post('/signin', userC.signin);
router.get('/search', searchC.getSimpleSearchResults);

router.post(
    "/test",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        mainC.test(req,res);
    }
);

router.get(
    "/profile/getProfile",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        console.log("found");
        profileC.getProfile(req,res);
    }
);

router.post(
    "/profile/createProfile",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        profileC.createProfile(req,res);
    }
);

router.route('/profile/getProfilePublic').get(profileC.getProfilePublic);


//Check weather user has a profile or not
router.get(
    "/profile/getProfileStatus",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        profileC.getProfileStatus(req,res);
    }
);


module.exports = router;
