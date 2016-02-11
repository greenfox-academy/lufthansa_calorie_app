// 'use strict';

// describe('Service', function() {
//   var request = require('supertest');
// 	var _ = require('underscore');
// 	var initExpressServer = require('../server/initExpress.js');
// 	var app;

// 	beforeEach(function() {
// 		var connection = {};
// 		connection.query = function(query, callback) {
// 			return callback(null, { rows: [{}] });
// 		};
// 		app = initExpressServer(connection);
// 	});

//   describe('GET /meals', function(){
//     it('should respond with json', function(done){
//       request(app)
//         .get('/meals')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end(function(err, res) {
//           if (err) {
//             done.fail(err);
//           } else {
//             console.log(res.body);
//             expect(_.isEqual(res.body, [{}])).toBeTruthy;
//             done();
//           }
//         });
//     });
//   });
// });