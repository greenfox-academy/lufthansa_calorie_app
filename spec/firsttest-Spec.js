'use strict';

var Meal = require('../dataBaseRequests');

describe('meal', function() {
	it('should give back one item', function() {
	  
	  function query(query, cb) {
		  cb(null, [{}, {}]);
	  }
		
	  var meal = new Meal(query);

		meal.getAll(function(err, meals) {
			expect(meals.length).toEqual(2);
		});
	});

		it('should give back one item', function() {
		  
		  function query(query) {
			 expect(query).toEqual('SELECT * FROM meal_table');
		  }
			
		  var meal = new Meal(query);
		  meal.getAll();
	});
		
		it('should give back one item', function() {
		  
		  function query(query) {
			 expect(query).toEqual('DELETE FROM meal_table WHERE meal_id=$1');
		  }
			
		  var meal = new Meal(query);
		  meal.deleteItem();
			
	});
});
