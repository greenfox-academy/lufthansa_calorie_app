use strict';

describe('addMealTest', function() {

  describe('when a meal added', function() { 
      var databaseEntriesAfterAdd;
      var databaseEntries;

    beforeEach(function() { 
      var dataBaseRequests = require('../dataBaseRequests');
      var itemDetails = {'name': 'sajtos sajt', 'calorie': 200, 'date': '2016-01-26 12:03:10'};


      dataBaseRequests.getAll(function (err, result) {
        if (err) {
          console.error(err); console.log('Error ' + err);
        }
        else {
          databaseEntries = (result.rows).length;
          return databaseEntries;
        }
      });
      console.log('databaseEntries: ' + databaseEntries);

      dataBaseRequests.addMealItem(itemDetails, function(err, result) {
        if (err) {
          console.error(err); console.log('Error ' + err);
        } else {
          console.log(result);
          return(result.rows);
        }

      dataBaseRequests.getAll(function (err, result) {
        if (err) {
          console.error(err); console.log('Error ' + err);
        }
        else {
          databaseEntriesAfterAdd = (result.rows).length;
          return databaseEntriesAfterAdd;
        }
      });
      console.log('databaseEntriesAfterAdd: ' + databaseEntriesAfterAdd);
       
    });

  });

    it('number of entries should increase by 1', function() { 
      expect(databaseEntriesAfterAdd - databaseEntries).toEqual(1);
    });
  });


});