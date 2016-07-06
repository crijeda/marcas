stuff = "Stuff";  // avoid typos, this string occurs many times.

Stuff = new Mongo.Collection(stuff);


// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(stuff, function () {
    return Stuff.find();
  });
}


/**
 * Create the schema for Stuff
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
Stuff.attachSchema(new SimpleSchema({
  fileId: {
    type: String
  }
}));
