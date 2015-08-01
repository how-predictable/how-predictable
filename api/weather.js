var weather = require('openweathermap');

// set defaults
weather.defaults({units:'metric', lang:'en', mode:'json'});

var out = {
	getHistory: getHistory,

};

module.exports = out;