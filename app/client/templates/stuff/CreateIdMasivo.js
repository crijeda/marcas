Template.CreateIdMasivo.events({

      'click .readxlsx': function (event) {
             Meteor.call('ReadXLSX');
      },
      'click .readxls': function (event) {
             Meteor.call('ReadXLS');
      },

});
