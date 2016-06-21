searchid = "SearchId";  // avoid typos, this string occurs many times.

SearchId = new Mongo.Collection(searchid);

Meteor.methods({
  /**
   * Invoked by AutoForm to add a new SearchId record.
   * @param doc The SearchId document.
   */
  addSearchId: function(doc) {
    check(doc, SearchId.simpleSchema());
    doc.createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
    SearchId.insert(doc);
    Router.go('listIds');
  },
  editSearchId: function(doc, docID) {
    check(doc, SearchId.simpleSchema());
    SearchId.update({_id: docID}, doc);
  },
   deleteSearchId: function(docID) {
    SearchId.remove({_id: docID});
  }

});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(searchid, function () {
    return SearchId.find();
  });
}


/**
 * Create the schema for SearchId
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
SearchId.attachSchema(new SimpleSchema({

  origenId: {
      type: String,
      optional:false,
      label: "Origen",
      autoform: {
        options: function () {
          return _.map((_.sortBy(Origen.find().fetch(), 'name')), function (c, i) {
            return {label: c.name, value: c._id};
          });
        }
      }
    },
    location: {
      type: String,
      optional:true,
      label: "Ubicación",
      autoform: {
        options: function () {
        return [
          {label: "CATALOGO", value: "CATALOGO"},
          {label: "ESPECIALES", value: "ESPECIALES"},
          {label: "FOOTER", value: "FOOTER"},
          {label: "HEADER", value: "HEADER"},
          {label: "HOME", value: "HOME"},
          {label: "LANDING PAGE", value: "LANDING PAGE"},
          ];
        },
      }
    },
     type: {
      type: String,
      optional:false,
      label: "Tipo",
      autoform: {
        options: function () {
        return [
          {label: "PRODUCTO", value: "PRODUCTO"},
          {label: "CATEGORIA", value: "CATEGORIA"},
          {label: "CONTENIDOS", value: "CONTENIDOS"},
          ];
        },
      }
    },
    descripcion: {
    label: "Descripcion",
    type: String,
    optional: false,
    max: 50,
  },
  param1: {
    type: Number,
    optional: true,
  },
    ecn: {
    type: String,
    optional: true,
    max: 50,
  },
   codigo: {
    type: String,
    optional: true,
    max: 50,
  },
  url: {
    label: "URL",
    type: String,
    optional: true,
    max: 200,
  },


}));