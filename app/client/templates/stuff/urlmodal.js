Template.exampleModal.events({

    'click .copy': function () {
      Meteor.subscribe("CreateId");
      var result = CreateId.findOne({},{sort: {createdAt: -1}});
         try
            {
                $('#urlmodal').select();
                document.execCommand('copy');
            }
            catch(e)
            {
                alert(e);
            }
    },

});

Template.exampleModal.helpers({

  /**
   * @returns {*} All of the Stuff documents.
   */
  CreatedIdList: function () {
    Meteor.subscribe("CreateId");
    return CreateId.findOne({},{sort: {createdAt: -1}});
  },
});