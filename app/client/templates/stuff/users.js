Template.users.helpers({
  users: function () {
    Meteor.subscribe("users");
    var users = Meteor.users.find({},{sort: {username: 1}}).fetch();
    return users
  },
});

Template.users.events({

    'click .remove': function () {
    Meteor.users.remove(this._id); 
    },
      'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.InputEmail.value;
        var passwordVar = event.target.InputPassword.value;
         Accounts.createUser({
            username: emailVar,
            password: passwordVar
        });
    }
});