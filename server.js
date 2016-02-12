'use strict';

var config = require('./server/config.js');
var initExpress = require('./server/initExpress.js');

var dataBaseQuery = require('./server/dataBaseQuery');
var app = initExpress(dataBaseQuery);
var port = config.PORT_FOR_SERVER;

app.listen(port, function() {
	console.log('Listening on port: ' + port);
});