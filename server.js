'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();
var port = process.env.PORT || 3000;
var databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:greenfox@localhost/calorie';

app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/meals', function (req, res) {
	getAll(function (err, result) {
		if (err) {
		 console.error(err); res.send('Error ' + err);
		}
		else {
		res.json(result.rows);
		};
	});
});

function getAll(cb) {
	pg.connect(databaseUrl, function(err, client, done) {
		console.log(err);
		client.query('SELECT * FROM meal_table', function(err, result) {
			done();
			cb(err, result);
		});
	});
};

app.get('/meals/:id', function (req, res) {
	getOne(req.params.id, function (res) {
			console.log('response: ', res);
			res.json(result);
	});
});


function getOne (id, cb) {
	pg.connect(databaseUrl, function(err, client, done) {
		console.log(err);
		client.query('SELECT meal_id, name, calorie, date WHERE id= ?', id, function(err, result) {
			done();
			if (err) throw err;
			console.log('result: ', result);
			return cb({'id': id});
		});
	});
}









app.listen(port, function() {
	console.log('app listen on port: ', port)
});
