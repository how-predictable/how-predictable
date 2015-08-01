var request = require('request');
var _ = require('underscore');

var HISTORY_URL = "http://www.metservice.com/publicData/climateDataDailyTown_wellington-city_32";
var FUTURE = "http://www.metservice.com/publicData/localForecastwellington-city";

function getHistory(callback){
	request(HISTORY_URL, function (error, response, body) {
  		if(!error && response.statusCode == 200){
  			callback(null, filterHistory(JSON.parse(body)));
			} else {
				callback(error, null);
			}
	});
}

function getForecast(callback){
	request(FUTURE, function (error, response, body) {
		if(!error && response.statusCode == 200){
			callback(null, filterForecast(JSON.parse(body)));
		} else {
			callback(error, null);
		}
	});
}

function filterForecast(forecast){
	return _.map(forecast.days, function(day){
		return renameKeys(
			_.pick(day, 'date', 'dow', 'dowTLA', 'forecast', 'forecastWord', 'max', 'min'),
			{'max': 'maxTemp', 'min': 'minTemp', 'dow': 'dayOfWeek', 'dowTLA': 'shortDayOfWeek'}
		);
	});
}

function filterHistory(history){
	var filted = _.map(history[0].data, function(day){
		return renameKeys(
			_.pick(day, 'maxTemp', 'minTemp', 'dateObs'),
			{'dateObs': 'date'}
		);
	});
	filted.reverse();
	return filted;
}

function renameKeys(obj, renameMap){
	return _.reduce(obj, function(result, value, key){
		if(renameMap.hasOwnProperty(key)){
			result[renameMap[key]] = value;
		} else {
			result[key] = value;
		}
		return result;
	}, {});
}

var out = {
	getHistory: getHistory,
	getForecast: getForecast
};
module.exports = out;
