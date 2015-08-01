var express = require('express');
var router = express.Router();

var weather = require('../api/weather');

/**
* Responds to GET http://{domain here}/api/weather/forecast
* Sends the next 10 days' (including today's) weather forecast.
*
* If a given city doesn't fails on lookup, the default city of "wellington-city"
*			will be used instead.
*
* URL Params:
*		city - optional param to find the weather for a city (default is "wellington-city").
*
* Data Sent:
*				a json array in the following format;
*
*				[
*					{
*						"date": str,
*						"dayOfWeek": str,
*						"shortDayOfWeek": str,
*						"forcast": str,
*						"forcastWord": str,
*						"maxTemp": int,
*						"minTemp": int
*					},
*					...
*				]
*
*				This array is sorted so the first element is today's weather and
*						tomorrows the next, and so on.
*/
router.get('/forecast/:city*?', function(req, res, next) {
	weather.getForecast(req.params.city, function(err, result){
		if(!err){
			res.send(result);
		} else {
			res.send(err);
		}
	});
});

/**
* Responds to GET http://{domain here}/api/weather/history
* Sends the last 32 days' (including today's) weather data.
*
* If a given city doesn't fails on lookup, the default city of "wellington-city"
*			will be used instead.
*
* URL Params:
*				city - optional param to find the weather for a city (default is "wellington-city").
*
* Data Sent:
*				a json array in the following format;
*
*				[
*					{
*						"date": str,
*						"maxTemp": int,
*						"minTemp": int
*					},
*					...
*				]
*
*				This array is sorted so the first element is the weather 31 days ago, and so on.
*				Note: at this time "NA" is a possible value for either of the temperature values.
*/
router.get('/history/:city*?', function(req, res, next) {
	weather.getHistory(req.params.city, function(err, result){
		if(!err){
			res.send(result);
		} else {
			res.send(err);
		}
	});
});

module.exports = router;
