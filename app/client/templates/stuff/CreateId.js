/**
 * After successful addition of a new Stuff document, go to List page.
 * See: https://github.com/aldeed/meteor-autoform#callbackshooks
 */
AutoForm.hooks({
  AddCreateIdForm: {
    /**
     * After successful form submission, go to the ListStuff page.
     * @param formType The form.
     * @param result The result of form submission.
     */
    onSuccess: function(formType, result) {
      Router.go('CreateId');
    }
  }
});

Template.CreateId.helpers({

    interna: function() {
    // Meteor.subscribe("Origen");
    var interna = Origen.findOne({name:"INTERNA"});
    return interna._id
  },
});