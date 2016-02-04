'use strict';

var pg = require('pg');
var config = require('./config.js');
var databaseUrl = process.env.DATABASE_URL || config.localDatabasePort;

function getAll(cb) {
	pg.connect(databaseUrl, function(err, client, done) {
		client.query('SELECT * FROM meal_table', function(err, result) {
			done();
			cb(err, result);
		});
	});
}



function deleteItem(id, cb) {
  pg.connect(databaseUrl, function(err, client, done) {
		client.query('DELETE FROM meal_table WHERE meal_id=$1', [id], function() {
  	  done();
		return cb(null, {'id': id});
  	});
  });
}

// function getOne (id, cb) {
// 	pg.connect(databaseUrl, function(err, client, done) {
// 		client.query('SELECT * FROM meal_table WHERE meal_id= $1', [id], function(err, result) {
// 			done();
// 			return cb(err, result);
// 		});
// 	});
// }

function getOne (id, cb) {
	console.log(id);
	query('SELECT * FROM meal_table WHERE meal_id= $1', [id], function(err, result) {
		cb(err, result);
	});
}

function query(query, id, cb) {
	var _id = id || null;
	pg.connect(databaseUrl, function(err, client, done) {
		if (err) {
			cb(err);
		}
		client.query(query, _id, function(err, result) {
			done();
			cb(err, result);
		});
	});
}


function addMealItem(itemDetails, callback) {
  pg.connect(databaseUrl, function(err, client, done) {
    client.query(
      'INSERT INTO meal_table (name, calorie, date) VALUES ($1, $2, $3) returning meal_id',
     [itemDetails.name, itemDetails.calorie, itemDetails.date],
      function(err, result) {
        done();
        return getOne(result.rows[0].meal_id, callback);
    });
  });
}


module.exports = {
	getAll		: getAll, 
	getOne		: getOne,
	addMealItem	: addMealItem,
	deleteItem	: deleteItem
};