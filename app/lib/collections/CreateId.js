createid = "CreateId";  // avoid typos, this string occurs many times.

CreateId = new Mongo.Collection(createid);

Meteor.methods({
  /**
   * Invoked by AutoForm to add a new CreateId record.
   * @param doc The CreateId document.
   */
  addCreateId: function(doc) {
    check(doc, CreateId.simpleSchema());
    doc.createdAt = moment().format("YYYY-MM-DDThh:mm:ss");
    CreateId.insert(doc);
  },
  /**
   *
   * Invoked by AutoForm to update a CreateId record.
   * @param doc The CreateId document.
   * @param docID It's ID.
   */
  editCreateId: function(doc, docID) {
    check(doc, CreateId.simpleSchema());
    CreateId.update({_id: docID}, doc);
  },
   deleteCreateId: function(docID) {
    CreateId.remove({_id: docID});
  }

});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(createid, function () {
    return CreateId.find();
  });
}


/**
 * Create the schema for CreateId
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
CreateId.attachSchema(new SimpleSchema({

 createdAt: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "datetime"
      }
    }
  },
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
    segment: {
      type: String,
      optional:true,
      label: "Segmento",
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
    optional: false,
    max: 50,
  },
  url: {
    label: "URL",
    type: String,
    optional: true,
    max: 200,
  },


}));