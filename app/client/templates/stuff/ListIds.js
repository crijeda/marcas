AutoForm.hooks({
  SearchForm: {
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
Template.ListIds.helpers({

  /**
   * @returns {*} All of the Stuff documents.
   */
  idlist: function () {
    var id = AutoForm.getFieldValue("origenId");
    return id
  },
  CreatedIdList: function () {
    var search ={}; 
    var id = AutoForm.getFieldValue("origenId");
    if(typeof id !== "undefined"){
    var search={origenId:id};
    }
    return CreateId.find(search,{sort: {createdAt: -1}});
  },
  NameOrigen: function (IdOrigen) {
    return Origen.findOne({_id:IdOrigen}).name
  }
});

Template.ListIds.events({

    'click .remove': function () {
   	Meteor.call('deleteCreateId',this._id);
    // Origen.remove(this._id);
     // alert(this._id);
    // Router.go('listOrigen');
    
  },
});