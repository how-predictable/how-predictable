var request = require('request');
var _ = require('underscore');

var HISTORY_URL = "http://www.metservice.com/publicData/climateDataDailyTown_wellington-city_32";
var FUTURE = "http://www.metservice.com/publicData/localForecastwellington-city";

function getHistory(callback){
	request(HISTORY_URL, function (error, response, body) {
  		if(!error && response.statusCode == 200){
			var filtered = filterHistory(body);
  			callback(null, filtered);
		} else {
			callback(error, null);
		}
	});
}

function getForecast(callback){
	request(FUTURE, function (error, response, body) {
		if(!error && response.statusCode == 200){
			var filtered = filterForecast(body);
  			callback(null, filtered);
		} else {
			callback(error, null);
		}
	});
}

function filterForecast(forecast){
	return forecast;
}

function filterHistory(history){
	return history;
}

var out = {
	getHistory: getHistory,
	getForecast: getForecast

};
module.exports = out;