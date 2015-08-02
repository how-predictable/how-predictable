(function() {
        var parent = document.getElementById('usage-graph');
        var canvas = document.getElementById('graph'),
                context = canvas.getContext('2d');
	
        // resize the canvas to fill browser window dynamically
        parent.addEventListener('resize', resizeCanvas, false);
        
        function resizeCanvas() {
                canvas.width = $("#usage-graph").width();
                canvas.height = $("#usage-graph").height();
                
                /**
                 * Your drawings need to be inside this function otherwise they will be reset when 
                 * you resize the browser window and the canvas goes will be cleared.
                 */
                getData(drawUsageGraph); 
        }
	
		// We want to wait until the page is loaded
		// as otherwise the element might not have a size
        $(document).ready(function() {
			resizeCanvas();
		});
})();