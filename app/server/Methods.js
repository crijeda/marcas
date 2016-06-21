Meteor.methods({

  download: function() {
  var collection = CreateId.find().fetch();
  var heading = true; // Optional, defaults to true
  var delimiter = "," // Optional, defaults to ",";
  return exportcsv.exportToCSV(collection, heading, delimiter);
  },

});