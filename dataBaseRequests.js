'use strict';

var pg = require('pg');
var databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:greenfox@localhost/calorie';

function getAll(cb) {
	pg.connect(databaseUrl, function(err, client, done) {
		client.query('SELECT * FROM meal_table', function(err, result) {
			done();
			cb(err, result);
		});
	});
}


function getOne (id, cb) {
	pg.connect(databaseUrl, function(err, client, done) {
		console.log(err);
		client.query('SELECT * FROM meal_table WHERE meal_id= $1', [id], function(err, result) {
			done();
			return cb(err, result);
		});
	});
}


function deleteItem(id, callback) {
  pg.connect(databaseUrl, function(err, client, done) {
  		client.query('DELETE FROM meal_table WHERE meal_id=$1', [id], function(err) {
        done();
       if (err) throw err;
  			return callback(null, {'id': id});
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
        console.log('result: ', result.rows[0].meal_id);
        return getOne(result.rows[0].meal_id, callback);
    });
  });
}


module.exports = {
	getAll		: getAll, 
	getOne		: getOne,
	addMealItem	: addMealItem,
	deleteItem	: deleteItem,
};