/**
* Main module for node server.
* Exposes the public dir, mounts the routes and starts the server.
*/
var express = require('express');
var path = require('path');

// load routing objects
var routes = require('./routes/index');
var weatherApiRoutes = require('./routes/weatherApi');
var powershopApiRoutes = require('./routes/powershopApi');

var app = express();

// expose public dirs
app.use(express.static(path.join(__dirname + '/public/views')));
app.use('/public', express.static(path.join(__dirname + '/public')));

// mount routes
app.use('/', routes);
app.use('/api/weather', weatherApiRoutes);
app.use('/api/powershop', powershopApiRoutes);

// setup server
app.listen(3000, function(){
	console.log("listening on port: 3000");
});
