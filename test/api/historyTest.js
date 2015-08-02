var weather = require('../../api/weather');

var exports = module.exports;

exports.testPropeties = function(test){
    weather.getHistory(null, function(err, history){
        test.assert(history.length == 32);
        var element = history[0];
        test.assert(element.hasOwnProperty('date'));
        test.assert(element.hasOwnProperty('maxTemp'));
        test.assert(element.hasOwnProperty('minTemp'));
        test.done();
    });
};
