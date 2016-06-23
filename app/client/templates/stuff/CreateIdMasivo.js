Template.CreateIdMasivo.events({

      'click .readxlsx': function (event) {
             Meteor.call('ReadXLSX');
      },
      'click .readxls': function (event) {
      var fs = Npm.require('fs');
      var path = Npm.require('path');
      var basepath = path.resolve('.').split('.meteor')[0];
      var excel = new Excel('xlsx');
      var workbook = excel.readFile( basepath+'files/Template_Todo.xls'); 
      var yourSheetsName = workbook.SheetNames;
      // console.log("Get the 1st Sheet Name (remember is an array): " + workbook.SheetNames[0]);
      // console.log("Get Some Cell from it: " + workbook.Sheets[yourSheetsName[0]]['B3'].v);
      // console.log(workbook.Sheets[yourSheetsName[0]]['B3'].v);
      var sheet = workbook.Sheets[yourSheetsName[0]];
      console.log(workbook.SheetNames[1]);
      },

});
