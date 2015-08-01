var express = require('express');
var path = require('path');

var routes = require('./routes/index');
var weatherApiRoutes = require('./routes/weatherApi');
var powershopApiRoutes = require('./routes/powershopApi');

var app = express();

app.use(express.static(path.join(__dirname + '/public/views')));
app.use('/public', express.static(path.join(__dirname + '/public')));

app.use('/', routes);
app.use('/api/weather', weatherApiRoutes);
app.use('/api/powershop', powershopApiRoutes);

app.listen(3000, function(){
	console.log("listening on port: 3000");
});
