var express = require('express');
var router = express.Router();

router.get('/forecast', function(req, res, next) {
	res.send({message: "Test!"});
});

module.exports = router;