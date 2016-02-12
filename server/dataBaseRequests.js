'use strict';

function DataBaseRequests(query) {
	var me = this;

	this.addMealItem = function(itemDetails, callback) {
  		query('INSERT INTO meal_table (name, calorie, date) VALUES ($1, $2, $3) returning meal_id',
  			   [itemDetails.name, itemDetails.calorie, itemDetails.date], function(err, result) {
  				me.getOne(result.rows[0].meal_id, callback);
		});
	};

	this.getAll = function(cb) {
		query('SELECT * FROM meal_table', function(err, result) {
			cb(err, result);
		});
	};

	this.deleteItem = function(id, cb) {
		query('DELETE FROM meal_table WHERE meal_id=$1', [id], function() {
			cb(null, {'id': id});
	  });
	};

	this.getOne = function(id, cb) {
		query('SELECT * FROM meal_table WHERE meal_id= $1', [id], function(err, result) {
			cb(err, result);
		});
	};
}

module.exports = DataBaseRequests;
