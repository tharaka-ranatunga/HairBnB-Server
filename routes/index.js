var express = require('express');
var router = express.Router();
var index = require('../controllers/mainController');


/* GET home page. */

router.get('/',index.getView);
router.get('/test',index.viewJson);


router.get('/insert',index.insert);

module.exports = router;
