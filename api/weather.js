//var request = require('request');
var weather = require('openweathermap');

// set defaults
function formName(cityName){
	return cityName + ',nz';
}

function formDate(jsDate){
	return Date.parse(jsDate).getTime() / 1000;
}

function defaultOptions(cityName){
	return { 'q': formName(cityName), 'type': 'daily', 'units': 'metric' };
}

function getHistory(cityName, startDate, endDate, callback){
	var options = defaultOptions(cityName);
	if(startDate){
		options['start'] = formDate(startDate);
	}
	if(endDate){
		options['end'] = formDate(endDate);
	}
	weather.history(options, function(err, result){
		callback(err, result);
	});
}

function getForecast(cityName, count, callback){
	var options = defaultOptions(cityName);
	if(count){
		options['ctn'] = count;
	}
	weather.forecast(options, function(err, result){
		callback(err, result);
	});
}

var out = {
	getHistory: getHistory,
	getForecast: getForecast

};
module.exports = out;