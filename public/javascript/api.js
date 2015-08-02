var oauthToken = undefined;

function getData(callback) {

	// Make sure that we have the key, otherwise return
	// undefined
	if (oauthToken === undefined) {
		
		// If there is no token in the URL then redirect to the
		// login page
		if (window.location.search.substring(1).indexOf("token") == -1) {
			window.location = "/api/powershop/auth";
		}
		
		oauthToken = window.location.search.substring(1).split("=")[1];
	}

	// Access the api and run the callback with the data
	// First get the powershop data and then get the wether
	$.get("/api/powershop/usage_data?token=" + oauthToken, function(power, status) {
		
		// If the data is undefined then redirect to the login
		// page
		if (power === undefined) {
			window.location = "/api/powershop/auth";
		}
		
		// Get just the power usage
		var tmpPowerUsage = JSON.parse(power).result.data;
		var powerUsage = [];
		
		// Go through all the usage data and round it
		for (var i = 0; i < tmpPowerUsage.length; i++) {
			powerUsage.push(Math.round(tmpPowerUsage[i] * 100) / 100);	
		}
		
		// Only temprarly hard coded
		$.get("/api/weather/history/wellington", function(wether, status) {

			// Get a list of dates from the wether data, and get
			// avg tempetures for each of the days
			var dates = [];
			var avgTemp = [];
			for (var i = 0; i < wether.length; i++) {
				dates.push(wether[i].date)	
				
				var dataPoint = (parseInt(wether[i].maxTemp) + parseInt(wether[i].minTemp))/2;
				
				if (!isNaN(dataPoint)) {
					avgTemp.push(Math.round(dataPoint * 100) / 100);
				} else {
					avgTemp.push(0);	
				}
			}

			// Create an object to hold all the data and
			// give it to the callback
			graphData = {
				dates: dates,
				power_usage: powerUsage,
				wether: avgTemp,
			};
			
			callback(graphData);
		});
	});

}