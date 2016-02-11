'use strict';

var request = require('supertest');
var initExpressServer = require('../server/initExpress.js');


describe('when GET req sent', function () {
  var query = function(query, callback) {
    callback(null, { rows: [{}] });
  };
  it('response format should be JSON', function(done) {
    var app = initExpressServer(query);
    request(app)
        .get('/meals')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
        if (err) throw err;
        done();
      });
  });
});

describe('when POST req sent', function () {
  var query = function(query, meal, callback) {
    callback(null, {rows: [{}]});
  };
  it('response format should be JSON', function(done) {
    var app = initExpressServer(query);
    request(app)
        .post('/meals')
        .expect('Content-Type', /json/)
        .send({name: 'breakfast', calorie: 380, date:'2016-02-02T00:00'})
        .expect(200)
      .end(function (err, res) {
       if (err) {
          throw err;
        }
        else {
          expect(res.body).toEqual([{}]);
        }
        done();
      });
  });
});

describe('Correct users returned', function () {
  var query = function(query, id, callback) {
    callback(null, {rows: [{}]});
  };
  it('response format should be JSON', function(done) {
    var app = initExpressServer(query);
    request(app)
      .delete('/meals/:1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        else {
          expect(res.body).toEqual('');
        }
        done();
      });
  });
});


describe('when GET req sent', function () {
var query = function(query, id, callback) {
    callback(null, {rows: [{}]});
  };
  it('response format should be JSON', function(done) {
    var app = initExpressServer(query);
    request(app)
        .get('/meals/:1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
        // if (err) {
        //   throw err;
        // }
        // else {
          expect(res.body).toEqual(Object({  }));
        // }
        done();
      });
  });
});