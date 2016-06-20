Template.IfLoggedIn.helpers({
  /**
   * @returns {*} True if Meteor is in the process of logging in.
   */
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  /**
   * @returns {boolean} True if there is a logged in user.
   */
  canShow: function() {
    return !!Meteor.user();
  }
});

Template.Header.helpers({

  AdminUser: function() {
   var user = Meteor.user() || null;
   if(user == null ){
    return false;
   }
   if(user.username == 'admin') {
    return true;
   } 
   else{
    return false;
   }  
  }
});
Template.Header.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

});
Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
        if (! Meteor.user()) {
          if (Meteor.loggingIn()) {
             Router.go('CreateId');
          }
          else{
            Router.go('login');
          }
        }
       
    }
});