Meteor.methods({

  download: function(descripcion,id,type,from,to,more) {
 
  var collection = CreateId.find({descripcion:{'$regex' : descripcion},
                          origenId:{'$regex' : id},
                          type:{'$regex' : type}, 
                          createdAt:{ $gte : from, $lt: to }},
                          {limit : more},
                          {sort: {createdAt: -1}}).fetch();

  var heading = true; // Optional, defaults to true
  var delimiter = "," // Optional, defaults to ",";
  return exportcsv.exportToCSV(collection, heading, delimiter);
  // return false
  },

});