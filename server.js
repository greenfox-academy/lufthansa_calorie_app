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
		}
	});
});

function getAll(cb) {
	pg.connect(databaseUrl, function(err, client, done) {
		client.query('SELECT * FROM meal_table', function(err, result) {
			done();
			cb(err, result);
		});
	});
}


app.get('/meals/:id', function (req, res) {
	getOne(req.params.id, function (err, result) {
			if (err) {
				console.error(err); res.send('Error ' + err);
			}
			else {
				console.log('response: ', res);
				res.json(result.rows);
			}
	});
});


function getOne (id, cb) {
	pg.connect(databaseUrl, function(err, client, done) {
		console.log(err);
		client.query('SELECT * FROM meal_table WHERE meal_id= $1', id, function(err, result) {
			done();
			return cb(err, result);
		});
	});
}

app.delete('/meals/delete/:id', function(req, res) {
  deleteItem(req.params.id, function(err, result) {
  	if (err) {
    		console.error(err); res.send('Error ' + err); 
    	} 
    	else {
      	    res.json(result.rows);
      	}
	  });
});

function deleteItem(id, callback) {
  pg.connect(databaseUrl, function(err, client, done) {
  		client.query('DELETE FROM meal_table WHERE meal_id=$1', id, function(err, result) {
        done();
       if (err) throw err;
  			console.log('result: ', result);
  			return callback({'id': id});
  		});
    });
}


app.post('/meals', function (req, res) {
  addMealItem(req.body, function(err, result) {
    if (err) {
      console.error(err); res.send('Error ' + err);
    }
    else {
      res.json(result);
    }
  });
});


function addMealItem(itemDetails, callback) {
  pg.connect(databaseUrl, function(err, client, done) {
    client.query('INSERT INTO meals SET $1', itemDetails, function(err, result) {
      done();
      if (err) throw err;
        // console.log('result: ', result);
        console.log('result insertId: ', result.insertId);
        return getOne(result.insertId, callback);
    });
  });
}

































app.listen(port, function() {
	console.log('app listen on port: ', port);
});
