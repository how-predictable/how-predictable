var express = require('express');
var router = express.Router();

var weather = require('../api/weather');

router.get('/forecast', function(req, res, next) {
	eather.getForecast('wellington', null, function(err, result){
		res.send(result);
	});
});

router.get('/history', function(req, res, next) {
	weather.getHistory('wellington', null, null, function(err, result){
		res.send(result);
	});
});

module.exports = router;