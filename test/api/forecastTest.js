var assert = require('unit.js').assert;
var weather = require('../../api/weather');

weather.getForecast(null, function(err, forecast){
    assert(!err);
    assert(forecast.length == 10);

    var day = forecast[0];

    assert(day.hasOwnProperty('date'));
    assert(typeof day.date === 'string');

    assert(day.hasOwnProperty('dayOfWeek'));
    assert(typeof day.dayOfWeek === 'string');

    assert(day.hasOwnProperty('shortDayOfWeek'));
    assert(typeof day.shortDayOfWeek === 'string');

    assert(day.hasOwnProperty('forecast'));
    assert(typeof day.forecast === 'string');

    assert(day.hasOwnProperty('forecastWord'));
    assert(typeof day.forecastWord === 'string');

    assert(day.hasOwnProperty('maxTemp'));
    assert(typeof day.maxTemp === 'string');

    assert(day.hasOwnProperty('minTemp'));
    assert(typeof day.minTemp === 'string');
});
