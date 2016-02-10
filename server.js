'use strict';

var config = require('./server/config.js');
var InitExpress = require('./server/initExpress.js');

var query = require('./server/dataBaseQuery');
var app = new InitExpress(query);
var port = process.env.PORT || config.localPort;

app.listen(port, function() {
	console.log('Listening on port: ' + port);
});