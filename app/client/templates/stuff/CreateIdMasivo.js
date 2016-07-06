Template.CreateIdMasivo.events({

      'click .readxlsx': function (event) {
             Meteor.call('ReadXLSX');
      },
});

Template.fileUpload.events({
    // Handle the form submit event
      // 'submit': function(event, template) {
      //     var files = event.target.files;
      //     for (var i = 0, ln = files.length; i < ln; i++) {
      //       Images.insert(files[i], function (err, fileObj) {
      //         // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      //       });
      //     }
      //   }
  });