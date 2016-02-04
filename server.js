'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config.js');
var pg = require('pg');
var databaseUrl = process.env.DATABASE_URL || config.localDatabasePort;
var Meal = require('./dataBaseRequests.js');

var port = process.env.PORT || config.localPort;

app.use(express.static('public'));
app.use(bodyParser.json());

function query(query, id, cb) {
	pg.connect(databaseUrl, function(err, client, done) {
		if (err) {
			cb(err);
		}
		if (cb) {
			client.query(query, id, function(err, result) {
		  	done();
			  cb(err, result);
		  });
		} else {
			cb = id;
			client.query(query, function(err, result) {
		  	done();
			  cb(err, result);
		  });
		}
	});
}

var meal = new Meal(query);


app.get('/meals', function (req, res) {
	meal.getAll(function (err, result) {
		if (err) {
			console.error(err); res.send('Error ' + err);
		}
		else {
			res.json(result.rows);
		}
	});
});

app.get('/meals/:id', function (req, res) {
	meal.getOne(req.params.id, function (err, result) {
		if (err) {
			console.error(err); res.send('Error ' + err);
		} else {
			res.json(result.rows);
		}
	});
});


app.delete('/meals/:id', function(req, res) {
  meal.deleteItem(req.params.id, function(err, result) {
  	if (err) {
    	console.error(err); res.send('Error ' + err); 
  	} else {
     	res.json(result);
   	}
	});
});


app.post('/meals', function (req, res) {
  meal.addMealItem(req.body, function(err, result) {
    if (err) {
      console.error(err); res.send('Error ' + err);
    }	else {
      res.json(result.rows);
    }
  });
});


app.listen(port, function() {
	console.log('app listen on port: ', port);
});
