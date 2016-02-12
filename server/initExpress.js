'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var DataBaseRequests = require('./dataBaseRequests.js');
var Service = require('./service.js');
	

function initExpressServer(dataBaseQuery) {
	var app = express();
	var dataBaseRequests = new DataBaseRequests(dataBaseQuery);
	var service = new Service(dataBaseRequests);

	app.use(express.static('public'));
	app.use(bodyParser.json());

	app.get('/meals/', service.getAll);
	app.get('meals/:id', service.getOne);
	app.delete('/meals/:id', service.deleteItem);
	app.post('/meals', service.addMeal);

	return app;
}

module.exports = initExpressServer;