var oauthToken = undefined;

function getData(callback) {

	// Make sure that we have the key, otherwise return
	// undefined
	if (oauthToken === undefined) {
		//var query = window.location.search.substring(1)
		console.log(window.location.search.substring(1));
		oauthToken = window.location.search.substring(1).split("=")[1];//vars[0];
		console.log(oauthToken);
		//oauthVerifier = vars[1];
	}

	// Access the api and run the callback with the data
	// First get the powershop data and then get the wether
	$.get("/api/powershop/usage_data?token=" + oauthToken, function(power, status) {

		
		// Get just the power usage
		var powerUsage = JSON.parse(power).result.data;
		
		// Only temprarly hard coded
		$.get("/api/weather/history/wellington", function(wether, status) {

			// Get a list of dates from the wether data, and get
			// avg tempetures for each of the days
			var dates = [];
			var avgTemp = [];
			for (var i = 0; i < wether.length; i++) {
				dates.push(wether[i].date)	
				
				var dataPoint = (parseInt(wether[i].maxTemp) + parseInt(wether[i].minTemp))/2;
			}

			// Create an object to hold all the data and
			// give it to the callback
			graphData = {
				dates: dates,
				power_usage: powerUsage,
				wether: avgTemp,
			};

			console.log(powerUsage);
			
			callback(graphData);
		});
	});

}