'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dataBaseRequests.js');
var app = express();
var config = require('./config.js');
var port = process.env.PORT || config.localPort;

app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/meals', function (req, res) {
	db.getAll(function (err, result) {
		if (err) {
			console.error(err); res.send('Error ' + err);
		}
		else {
			res.json(result.rows);
		}
	});
});

app.get('/meals/:id', function (req, res) {
	db.getOne(req.params.id, function (err, result) {
		if (err) {
			console.error(err); res.send('Error ' + err);
		} else {
			res.json(result.rows);
		}
	});
});


app.delete('/meals/:id', function(req, res) {
  db.deleteItem(req.params.id, function(err, result) {
  	if (err) {
    	console.error(err); res.send('Error ' + err); 
  	} else {
     	res.json(result);
   	}
	});
});


app.post('/meals', function (req, res) {
  db.addMealItem(req.body, function(err, result) {
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
