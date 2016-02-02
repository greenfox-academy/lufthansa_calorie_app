describe("Player", function() {
  var sayHello = require('../public/script/hello-world');

  it("should be able to play a Song", function() {

    //demonstrates use of custom matcher
    expect(sayHello()).toEqual('Hello!');
  });

});