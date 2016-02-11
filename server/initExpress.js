'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Meal = require('./dataBaseRequests.js');
var Service = require('./service.js');
	

function initExpressServer(query) {
	var app = express();
	var meal = new Meal(query);
	var service = new Service(meal);

	app.use(express.static('public'));
	app.use(bodyParser.json());

	app.get('/meals/', service.getAll);
	app.get('meals/:id', service.getOne);
	app.delete('/meals/:id', service.deleteItem);
	app.post('/meals', service.addMeal);

	return app;
}

module.exports = initExpressServer;