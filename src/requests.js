'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/meals', function (request, response) {
	getAll(function (err, result) {
		if (err) {
		 console.error(err); response.send('Error ' + err);
		}
		else {
		response.json(result.rows);
		};
	});
});

function getAll(callback) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM meal_table', function(err, result) {
			done();
			callback(err, result);
		});
	});
};

module.exports = app;