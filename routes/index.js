var express = require('express');
var router = express.Router();
var index = require('../controllers/mainController');

/* GET home page. */

router.get('/',index.getView);
router.post('/test',index.viewJson);


router.post('/insert',index.insert);

module.exports = router;
