
Template.ListIds.helpers({

  CreatedIdList: function () {
    var descripcion = Session.get('test') || '.*.*';
    var id = Session.get('origen') || '.*.*';
    var type = Session.get('type') || '.*.*';
    var from = Session.get('from') || '2000-01-01';
    var to = Session.get('to') || '2050-01-01';
    var from = from + 'T00:00:00';
    var to = to+'T23:59:59';
    var more = Session.get('more') || 5;
    var total = CreateId.find({descripcion:{'$regex' : descripcion},
                          origenId:{'$regex' : id},
                          type:{'$regex' : type}, 
                          createdAt:{ $gte : from, $lt: to }},
                          {sort: {createdAt: -1}}).count();
    Session.set('total', total); 

    var result =CreateId.find({descripcion:{'$regex' : descripcion},
                          origenId:{'$regex' : id},
                          type:{'$regex' : type}, 
                          createdAt:{ $gte : from, $lt: to }},
                          {limit : more},
                          {sort: {createdAt: -1}});
    Session.set('result', result.count());

    return result
  },
  NameOrigen: function (IdOrigen) {
    return Origen.findOne({_id:IdOrigen}).name
  },
   Origen: function () {
    return Origen.find().fetch()
  },
   DateFormat: function (date) {
    return moment(date).format("DD-MM-YYYY");
  },
   Total: function () {
    return Session.get('total');
  },
    Result: function () {
    return Session.get('result');
  },
});

Template.ListIds.events({

    'click .search': function () { 
    var test = $('#search').val();
    if(typeof test !== "undefined"){
    Session.set('test', $('#search').val()); 
    }
    var select = $('#select').val();
    if(typeof select !== "undefined"){
    Session.set('origen', select); 
    }
     var type = $('#type').val();
    if(typeof type !== "undefined"){
    Session.set('type', type); 
    }
    var from = $('#from').val();
    if(from !== ''){
    Session.set('from', from); 
    }
    var to = $('#to').val();
    if(to !== ''){
    Session.set('to', to); 
    }
    return false
    },
    'click .clear': function () {
    document.getElementById("filter").reset();
    Session.set('test', undefined); 
    Session.set('origen', undefined); 
    Session.set('type', undefined); 
    Session.set('from', undefined); 
    Session.set('to', undefined);
    Session.set('more', 0); 
    return false
    },
    'click .more': function () {
      var counter = $('#TextBox').val();
       counter++ ;
       $('#TextBox').val(counter);
      var more = counter*5;
      Session.set('more', more); 
    return false
    },
    'click .remove': function () {
   	Meteor.call('deleteCreateId',this._id);
    },
    'click .download': function(event) {
        var descripcion = Session.get('test') || '.*.*';
        var id = Session.get('origen') || '.*.*';
        var type = Session.get('type') || '.*.*';
        var from = Session.get('from') || '2000-01-01';
        var to = Session.get('to') || '2050-01-01';
        var from = from + 'T00:00:00';
        var to = to+'T23:59:59';
        var more = Session.get('more') || 5;
        var nameFile = 'Marcas.csv';
      Meteor.call('download',descripcion,id,type,from,to,more, function(err, fileContent) {
        if(fileContent){
          var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
          saveAs(blob, nameFile);
        }
    })},
});