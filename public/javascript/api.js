
function getData(callback) {

	// Make sure that we have the key, otherwise return
	// undefined
//	if (key === undefined) {
//		return undefined;	
//	}

	// Access the api and run the callback with the data
	// First get the powershop data and then get the wether
	$.get("/api/powershop/usage_data", function(power, status) {
		
		// Get just the power usage
		var powerUsage = power.result.data;//[];
		//for (var i = 0; i < power.result.length; i++) {
		//	powerUsage.push(power.result[i]);	
		//}
		
		// Only temprarly hard coded
		$.get("/api/weather/history/wellington", function(wether, status) {

			// Get a list of dates
			var dates = [];
			for (var i = 0; i < wether.length; i++) {
				dates.push(wether[i].date)	
			}
			
			var maxTemp = [];
			for (var i = 0; i < wether.length; i++) {
				maxTemp.push(wether[i].max);	
			}

			graphData = {
				dates: dates,
				power_usage: powerUsage,
				wether: wether,
			}

			callback(graphData);
		});
	});
}