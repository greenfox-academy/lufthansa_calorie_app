'use strict';

describe('test the test', function() {
	var test = require('../dataBaseRequests');

	it('should give back Hello World', function() {
		expect(test.helloWorld()).toEqual('hello world');
	});
});
