Meteor.publish("users", function () {
return Meteor.users.find();
});

Meteor.users.allow({
 remove:function(){
   return true;
  }
});


Uploads.allow({
  insert:function(){
    return true;
  },
  update:function(){
   return true;
  },
  remove:function(){
    return true;
  },
  download:function(){
    return true;
  }
});

Stuff.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});

