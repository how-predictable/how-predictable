var express = require('express');
var router = express.Router();

router.get('/forecast', function(req, res, next) {
	console.log(req.query);
	res.send({message: "Test!"});
});

router.get('/history', function(req, res, next) {
	res.send({message: "Test history!"});
});

module.exports = router;