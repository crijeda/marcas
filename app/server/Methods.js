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
  json: function(sku) {
      var url = "http://www.sodimac.cl/sodimac-cl/browse/productJson.jsp?productId=" + sku;
      //synchronous GET
      var result = Meteor.http.get(url);
      // instance.counter = new ReactiveVar("");
      // instance.counter.set(result);
      // console.log(result.content);

      if(result.statusCode==200) {
        var respJson = JSON.parse(result.content);
        console.log("response received.");
        // console.log(respJson);
        return respJson;
      } else {
        console.log("Response issue: ", result.statusCode);
        var errorJson = JSON.parse(result.content);
        throw new Meteor.Error(result.statusCode, errorJson.error);
      }
    }

});