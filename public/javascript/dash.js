function drawUsageGraph(graphData) {
	console.log(graphData.wether);
	
	var data = {
		labels: graphData.dates,
		datasets: [
			{
				label: "Wether",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: graphData.wether,
			},
//			{
//				label: "Power Usage",
//				fillColor: "rgba(151,187,205,0.2)",
//				strokeColor: "rgba(151,187,205,1)",
//				pointColor: "rgba(151,187,205,1)",
//				pointStrokeColor: "#fff",
//				pointHighlightFill: "#fff",
//				pointHighlightStroke: "rgba(151,187,205,1)",
//				data: graphData.power_usage,
//			}
		]
	};

	var options = {
		scaleShowGridLines : true,
		scaleGridLineColor : "rgba(0,0,0,.05)",
		scaleGridLineWidth : 1,
		scaleShowHorizontalLines: true,
		scaleShowVerticalLines: true,
		bezierCurve : true,
		bezierCurveTension : 0.4,
		pointDot : true,
		pointDotRadius : 4,
		pointDotStrokeWidth : 1,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true,
		responsive: true,
	};

	// Draw the graph
	var ctx = document.getElementById("graph").getContext("2d");
	var myNewChart = new Chart(ctx).Line(data, options);
};