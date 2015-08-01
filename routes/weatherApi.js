var express = require('express');
var router = express.Router();

var weather = require('../api/weather');

router.get('/forecast', function(req, res, next) {
	weather.getForecast(function(err, result){
		if(!err){
			res.send(result);
		} else {
			res.send(err);
		}
	});
});

router.get('/history', function(req, res, next) {
	weather.getHistory(function(err, result){
		if(!err){
			res.send(result);
		} else {
			res.send(err);
		}
	});
});

module.exports = router;