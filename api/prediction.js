var _ = require('underscore');

var KELVIN_DELTA = 273.15;

function getFutureUsage(historyWeather, forecastWeather, powerUsage){
    var avgPowerPerTemp = calcPowerPerTemp(historyWeather, powerUsage);
}

function toKelvin(temp){
    return temp + KELVIN_DELTA;
}

function calcPowerPerTemp(weather, power){
    if(weather.length != power.length){
        throw "lengths don't match";
    }
    var len = power.length;
    var totalPowerPerTemp = 0;
    for(var i = 0; i < len; i++){
        totalPowerPerTemp += power[i] / toKelvin(weather[i]);
    }
    return totalPowerPerTemp /= len;
}

function predict(avgPowerPerTemp, forecastWeather){
    var sum = _.reduce(forecastWeather, function(result, temp){
        return result + (avgPowerPerTemp * toKelvin(temp));
    }, 0);
    var avg = sum / forecastWeather.length;
    return {
        sum: sum,
        avg: avg
    };
}

var out = {
    getFutureUsage: getFutureUsage
};
module.exports = out;
