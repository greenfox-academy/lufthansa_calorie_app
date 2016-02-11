'use strict';

var config = require('./server/config.js');
var initExpress = require('./server/initExpress.js');

var query = require('./server/dataBaseQuery');
var app = initExpress(query);
var port = process.env.PORT || config.localPort;

app.listen(port, function() {
	console.log('Listening on port: ' + port);
});