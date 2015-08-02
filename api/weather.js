/**
* Module for getting data from MetService's API and parsing it to our own format.
*/
var request = require('request');
var _ = require('underscore');

/**
* URL endpoints for MetService's forecast and history data.
* These are in arrays so the city name can be inserted into the url by calling .join(cityName) on them.
*/
var HISTORY_URL = ["http://www.metservice.com/publicData/climateDataDailyTown_", "_32"];
var FUTURE = ["http://www.metservice.com/publicData/localForecast", ""];

/** Default city for lookups (will be used if no city is seserfied or a given city fails) */
var DEFAULT_CITY = "wellington-city";

/**
* Gets history data from MetService and formats it to our own format (see: routes/weatherApi.js).
*
* Params:
*		cityName - name of city (default="wellington-city")
*		callback - a function which will be called after the data is resolved,
*					the arguments passed into it will be (error, results).
*
* Returns:
*		undefined (this function runs asynchronous call(s) therefore a callback is used to pass the results/error back)
*/
function getHistory(cityName, callback){
	var url = HISTORY_URL.join(cityName ? cityName : DEFAULT_CITY);
	request(url, function (error, response, body) {
		// a successful response
		if(!error && response.statusCode == 200){
			callback(null, filterHistory(JSON.parse(body)));
		}
		// the clientside give a city name which didn't match up with metservice's city names,
		// retry with default of "wellington-city".
		else if(cityName){
			console.log("*** ERROR: couldn't find city's results (" + cityName + "), retrying with default city: " + DEFAULT_CITY);
			getHistory(DEFAULT_CITY, function(err, result){
				callback(err, result);
			});
		}
		// the failure case (neither the provided city (if given) nor the default city worked)
		else {
			callback(error, null);
		}
	});
}

/**
* Gets forecast data from MetService and formats it to our own format (see: routes/weatherApi.js).
*
* Params:
*		cityName - name of city (default="wellington-city")
*		callback - a function which will be called after the data is resolved,
*					the arguments passed into it will be (error, results).
*
* Returns:
*		undefined (this function runs asynchronous call(s) therefore a callback is used to pass the results/error back)
*/
function getForecast(cityName, callback){
	var url = FUTURE.join(cityName ? cityName : DEFAULT_CITY);
	request(url, function (error, response, body) {
		// a successful response
		if(!error && response.statusCode == 200){
			callback(null, filterForecast(JSON.parse(body)));
		}
		// the clientside give a city name which didn't match up with metservice's city names,
		// retry with default of "wellington-city".
		else if(cityName){
			console.log("*** ERROR: couldn't find city's results (" + cityName + "), retrying with default city: " + DEFAULT_CITY);
			getForecast(DEFAULT_CITY, function(err, result){
				callback(err, result);
			});
		}
		// the failure case (neither the provided city (if given) nor the default city worked)
		else {
			callback(error, null);
		}
	});
}

/**
* Filter MetService's furture forecast data to our own format.
*
* Params:
*		forecast - obj returned from metservice's api
*
* Returns:
*		an array of the next 10 days' weather, sorted into ascending order by their dates.
*/
function filterForecast(forecast){
	return _.map(forecast.days, function(day){
		return renameKeys(
			_.pick(day, 'date', 'dow', 'dowTLA', 'forecast', 'forecastWord', 'max', 'min'),
			{'max': 'maxTemp', 'min': 'minTemp', 'dow': 'dayOfWeek', 'dowTLA': 'shortDayOfWeek'}
		);
	});
}

/**
* Filter MetService's history data to our own format.
*
* Params:
*		history - obj returned from metservice's api
*
* Returns:
*		an array of the last 32 days' weather, sorted into ascending order by their dates.
*/
function filterHistory(history){
	lerpArray(history, 'maxTemp', 'NA');
	lerpArray(history, 'minTemp', 'NA');
	var filted = _.map(history[0].data, function(day){
		return renameKeys(
			_.pick(day, 'maxTemp', 'minTemp', 'dateObs'),
			{'dateObs': 'dkate'}
		);
	});
	filted.reverse();
	return filted;
}

function lerpArray(array, key, invalid){
	function get(index){
		return array[index][key];
	}
	function isValid(index){
		return get(index) !== invalid;
	}
	for(var i = 0; i < array.length; i++){
		if(!isValid(i)){
			var divide = 0;
			var sum = 0;
			if(i > 0 && isValid(i - 1)){
				divide++;
				sum += parseInt(get(i - 1));
			}
			if(i < array.length - 1 && isValid(i + 1)){
				divide++;
				sum += parseInt(get(i + 1));
			}
			array[i][key] = '' + (sum / divide);
		}
	}
}

/**
* Construct a new object with specified keys renamed.
*
* Params:
*		obj	- object to copy and rename
*		renameMap - object whose keys maps obj's key names to their new names
*
* Returns:
*		a new object with keys renamed iff that key is in renameMap
*/
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

// Module to expose
var out = {
	getHistory: getHistory,
	getForecast: getForecast
};
module.exports = out;
