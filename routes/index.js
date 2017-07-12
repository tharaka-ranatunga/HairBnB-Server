var express = require('express');
var router = express.Router();
var index = require('../controllers/mainController');

/* GET home page. */

router.get('/',index.getView);
router.post('/insert', index.insert);

// router.post('/insert',index.insert);

module.exports = router;
