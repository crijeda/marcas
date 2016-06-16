origen = "Origen";  // avoid typos, this string occurs many times.

Origen = new Mongo.Collection(origen);

Meteor.methods({
  /**
   * Invoked by AutoForm to add a new Origen record.
   * @param doc The Origen document.
   */
  addOrigen: function(doc) {
    check(doc, Origen.simpleSchema());
    Origen.insert(doc);
  },
  /**
   *
   * Invoked by AutoForm to update a Origen record.
   * @param doc The Origen document.
   * @param docID It's ID.
   */
  editOrigen: function(doc, docID) {
    check(doc, Origen.simpleSchema());
    Origen.update({_id: docID}, doc);
  },
   deleteOrigen: function(docID) {
    Origen.remove({_id: docID});
  }

});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(origen, function () {
    return Origen.find();
  });
}


/**
 * Create the schema for Origen
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
Origen.attachSchema(new SimpleSchema({
  name: {
    label: "Nombre",
    type: String,
    optional: false,
    max: 20,
    autoform: {
      group: origen,
      placeholder: "Nombre"
    }
  },
  param1: {
    label: "Parametro 1",
    type: String,
    optional: false,
    max: 20,
    autoform: {
      group: origen,
      placeholder: "Parametro 1"
    }
  },
  param2: {
    label: "Parametro 2",
    type: String,
    optional: true,
    max: 20,
    autoform: {
      group: origen,
      placeholder: "Parametro 2"
    }
  },
}));