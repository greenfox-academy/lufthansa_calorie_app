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
});
