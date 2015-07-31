var express = require('express');
var path = require('path');

var routes = require('./routes/index');

var app = express();

app.use(express.static(path.join(__dirname + '/public/views')));
app.use(express.static(path.join(__dirname + '/public/javascript')));

app.use('/', routes);


app.listen(3000, function(port){
	console.log("listening on port: 3000");
});

