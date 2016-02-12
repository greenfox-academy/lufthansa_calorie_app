'use strict';

function Controller(query) {
  var me = this;
  this.getAll = function (request, response) {
    query.getAll(function (err, result) {
      me.handleResponse(err, result, response);
    });
  };

  this.getOne = function(request, response) {
    query.getOne(function (err, result) {
      me.handleResponse(err, result, response);
    });
  };

  this.addMeal = function (request, response) {
    query.addMealItem(request.body, function(err, result) {
      me.handleResponse(err, result, response);
    });
  };

  this.deleteItem = function (request, response) {
    query.deleteItem(request.params.id, function(err, result) {
      me.handleResponse(err, result, response);
    });
  };

  this.handleResponse = function (err, result, response) {
    if (err) {
      console.error(err);
      response.send('Error ' + err);
    }	else {
      response.json(result.rows);
    }
  };
}

module.exports = Controller;