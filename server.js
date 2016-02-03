'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dataBaserequests.js');
var app = express();
var port = process.env.PORT || 3000;

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
			}
			else {
				console.log('response: ', res);
				res.json(result.rows);
			}
	});
});


app.delete('/meals/delete/:id', function(req, res) {
  db.deleteItem(req.params.id, function(err, result) {
  	if (err) {
    		console.error(err); res.send('Error ' + err); 
    	} 
    	else {
      	    res.json(result);
      	}
	  });
});


app.post('/meals', function (req, res) {
	// console.log('itt tart:', req.body);
  db.addMealItem(req.body, function(err, result) {
    if (err) {
      console.error(err); res.send('Error ' + err);
    }
    else {
      res.json(result.rows);
      console.log(result);
    }
  });
});


app.listen(port, function() {
	console.log('app listen on port: ', port);
});
