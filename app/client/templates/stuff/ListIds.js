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
    var descripcion = AutoForm.getFieldValue("descripcion");
    if(typeof id !== "undefined" && typeof descripcion == "undefined"){
    var search={origenId:id};
    }
    if(typeof id !== "undefined" && typeof descripcion !== "undefined"){
    var search={origenId:id,descripcion:{'$regex' : '.*' + descripcion + '.*'}};
    }
    if(typeof id == "undefined" && typeof descripcion !== "undefined"){
    var search={descripcion:{'$regex' : '.*' + descripcion + '.*'}};
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
    },
    'click .download': function(event) {
  var nameFile = 'Marcas.csv';
  Meteor.call('download', function(err, fileContent) {
    if(fileContent){
      var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
      saveAs(blob, nameFile);
    }
  })},
});