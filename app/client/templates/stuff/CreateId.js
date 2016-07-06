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

Template.CreateId.events({

    'click .test': function (event) {
         setTimeout(function(){
            Modal.show('exampleModal')
        })
    },
    'submit': function (event) {
         setTimeout(function(){
            Modal.show('exampleModal')
        })
    },
     'click .producto': function (event) {
      var codigo = $('[name=codigo]').val() || "empty"; 
      Meteor.call('json',codigo, function(error, result){
      if(error){
      alert('Error');
      }else{
       $('[name=descripcion]').val(result[0].name);
      }
    });
    },

});

Template.CreateId.helpers({

    interna: function() {
    // Meteor.subscribe("Origen");
    var interna = Origen.findOne({name:"INTERNA"});
    return interna._id
  },
       options1: function() {
    // Meteor.subscribe("Origen");
    return[
          {label: "BANNER", value: "BANNER"},
          {label: "BANNER HEADER", value: "BANNER HEADER"},
          {label: "BANNERS INST", value: "BANNERS INST"},
          {label: "BANNERS Z2", value: "BANNERS Z2"},
          {label: "CATEGORIA", value: "CATEGORIA"},
          {label: "DESTACADOS", value: "DESTACADOS"},
          {label: "LO NUEVO", value: "LO NUEVO"},
          {label: "MKT PRIORITY", value: "MKT PRIORITY"},
          {label: "OPU STOCK LIM", value: "OPU STOCK LIM"},
          {label: "VITRINA", value: "VITRINA"},
          {label: "VITRINA HOME", value: "VITRINA HOME"},

          ];
  },
     options2: function() {
    // Meteor.subscribe("Origen");
    return[
          {label: "BANNER", value: "BANNER"},
          {label: "CATEGORIA", value: "CATEGORIA"},
          ];
  },
    emkt: function() {
    // Meteor.subscribe("Origen");
    var interna = Origen.findOne({name:"EMKT"});
    return interna._id
  },
   currentFieldParam1:function () {
  var id = AutoForm.getFieldValue("origenId") || "empty";

  var origenId = CreateId.findOne({origenId:id},{sort: {createdAt: -1}});

  if(origenId === undefined){
  var origenparam1 = 1234; 
  }
  else{
  var origenparam1 = origenId.param1+1; 
  }
  return origenparam1
  },
  currentUrl:function () {
  var type = AutoForm.getFieldValue('type') || "empty";
      if(type == "CATEGORIA"){
        var typeurl = 'http://www.sodimac.cl/sodimac-cl/category/';
      }
       if(type == "PRODUCTO"){
        var typeurl = 'http://www.sodimac.cl/sodimac-cl/product/';
      }
       if(type == "CONTENIDOS"){
        var typeurl = 'http://www.sodimac.cl/sodimac-cl/content/';
      }
  var codigo = AutoForm.getFieldValue('codigo') || "empty";
  var codigourl = codigo+"/?";
  var id = AutoForm.getFieldValue('origenId') || "empty";
  var origen = Origen.findOne({_id:id});
  if(origen=== undefined){
  var param1 = 0;
  var param2 = 0;
  }
  else{
  var param1 = origen.param1;
  var param2 = origen.param2;
  }
  var origenId = CreateId.findOne({origenId:id},{sort: {createdAt: -1}});

  if(origenId === undefined){
  var origenparam1 = 1234; 
  }
  else{
  var origenparam1 = origenId.param1+1; 
  }
      
      
      if (param2 === undefined){
       var paramsurl = param1+'='+origenparam1
      }
      else{
        if(typeof origen != 'undefined'){

        if(origen.name == "EMKT"){
          var paramsurl = param1+'='+origenparam1+'&'+param2+'='+AutoForm.getFieldValue("ecn") 
        }
        else{
            var paramsurl = param1+'='+origenparam1+'&'+param2+'='+origen.name 
        }
       }
      }
  return typeurl + codigourl + paramsurl
  },

});