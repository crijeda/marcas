Template.ListOrigen.helpers({

  /**
   * @returns {*} All of the Stuff documents.
   */
  origenList: function () {
    return Origen.find();
  }
});

Template.ListOrigen.events({

    'click .remove': function () {
   	Meteor.call('deleteOrigen',this._id);
    // Origen.remove(this._id);
     // alert(this._id);
    // Router.go('listOrigen');
    
  },
});