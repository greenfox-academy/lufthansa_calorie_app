'use strict';

var createRequest = function(method, url, data, cb) {
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(data);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      cb(request.response);
    }
  };
};

module.exports = createRequest;