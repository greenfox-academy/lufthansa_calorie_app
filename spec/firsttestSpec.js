describe("Player", function() {
  var sayHello = require('../hello-world');

  it("should be able to play a Song", function() {

    //demonstrates use of custom matcher
    expect(sayHello()).toEqual('Hell!');
  });

});