var assert = require('unit.js').assert;
var weather = require('../../api/weather');

weather.getHistory(null, function(err, history){
    assert(!err);
    assert(history.length == 32);

    var day = history[0];

    assert(day.hasOwnProperty('date'));
    assert(typeof day.date === 'string');

    assert(day.hasOwnProperty('maxTemp'));
    assert(typeof day.maxTemp === 'string');

    assert(day.hasOwnProperty('minTemp'));
    assert(typeof day.minTemp === 'string');

    for(var i = 0; i < history.length; i++){
        var day = history[i];
        assert(day.minTemp !== 'NA');
        assert(day.maxTemp !== 'NA');
    }
});
