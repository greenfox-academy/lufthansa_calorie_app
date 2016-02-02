'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('./mysqlQuery.js');


var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());


app.post('/meals', function(req, res) {
	mysql.add(req.body, function(item) {
		return res.status(201).json(item);
	});
});

app.get('/meals', function(req, res) {
	mysql.getAll( function(result) {
		res.status(200).json(result);
	});
});

app.delete('/meals/:id', function(req, res) {
	mysql.remove(req.params.id, function(result) {
		res.json(result);
	});
});

module.exports = app;