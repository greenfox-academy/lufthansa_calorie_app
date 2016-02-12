'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var DataBaseRequests = require('./dataBaseRequests.js');
var Controller = require('./controller.js');

function initExpressServer(dataBaseQuery) {
	var app = express();
	var dataBaseRequests = new DataBaseRequests(dataBaseQuery);
	var controller = new Controller(dataBaseRequests);

	app.use(express.static('public'));
	app.use(bodyParser.json());

	app.get('/meals/', controller.getAll);
	app.get('meals/:id', controller.getOne);
	app.delete('/meals/:id', controller.deleteItem);
	app.post('/meals', controller.addMeal);

	return app;
}

module.exports = initExpressServer;