'use strict';

var pg = require('pg');
var config = require('./config.js');
var databaseUrl = process.env.DATABASE_URL || config.localDatabasePort;

function addMealItem(itemDetails, callback) {
  query('INSERT INTO meal_table (name, calorie, date) VALUES ($1, $2, $3) returning meal_id',
  	   [itemDetails.name, itemDetails.calorie, itemDetails.date], function(err, result) {
  				getOne(result.rows[0].meal_id, callback);
	});
}

function getAll(cb) {
	query('SELECT * FROM meal_table', function(err, result) {
	cb(err, result);
	});
}

function deleteItem(id, cb) {
	console.log(id);
		query('DELETE FROM meal_table WHERE meal_id=$1', [id], function() {
		cb(null, {'id': id});
  });
}

function getOne (id, cb) {
	query('SELECT * FROM meal_table WHERE meal_id= $1', [id], function(err, result) {
		cb(err, result);
	});
}

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

module.exports = {
	getAll		: getAll, 
	getOne		: getOne,
	addMealItem	: addMealItem,
	deleteItem	: deleteItem
};