var express = require('express');
var router = express.Router();
var mainC = require('../controllers/mainController');
var userC = require('../controllers/userController');
var passport = require('../middleware/passport');

/* GET home page. */

router.get('/',mainC.getView);
router.post('/signup', userC.signup);
router.post('/signin', userC.signin);

router.post(
    "/test",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        mainC.test(req,res);
    }
);

module.exports = router;
