Meteor.publish("users", function () {
return Meteor.users.find();
});

Meteor.users.allow({
 remove:function(){
   return true;
  }
});

