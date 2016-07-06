Meteor.methods({
  /**
   * Invoked by AutoForm to add a new Origen record.
   * @param doc The Origen document.
   */
  ReadXLSX: function(doc) {

  	var fs = Npm.require('fs');
	var path = Npm.require('path');
	var basepath = path.resolve('.').split('.meteor')[0];
	var excel = new Excel('xlsx');
	// var workbook = excel.readFile( basepath+'files/Template_Todo.xls'); 
	var workbook = excel.readFile('/Users/cristianojeda/projectUploads/uploads-r6rAp8n2Bpc5mGfeX-Template_Todo.xls'); 
	var yourSheetsName = workbook.SheetNames;
	console.log("Get the 1st Sheet Name (remember is an array): " + workbook.SheetNames[0]);
	console.log("Get Some Cell from it: " + workbook.Sheets[yourSheetsName[0]]['B3'].v);
	console.log(workbook.Sheets[yourSheetsName[0]]['B3'].v);
	var sheet = workbook.Sheets[yourSheetsName[0]]

	// You can get the sheet as list of lists.
	var options = { header : 1 }

	// Or you  can get an object with column headers as keys.  
	var options = { header : ['title', 'fName', 'sName' ,'address' ] }

	// If options is empty or omitted, it should use the first-row headers by default. 
	// However this doesn't seem to work with all Excel worksheets. 
	var options = {}

	// Generate the JSON like so:
	var workbookJson = excel.utils.sheet_to_json( sheet, options );
	console.log(workbookJson)
    
  },

 //  ReadXLS: function(doc) {

 //  	var fs = Npm.require('fs');
	// var path = Npm.require('path');
	// var basepath = path.resolve('.').split('.meteor')[0];
	// var excel = new Excel('xlsx');
	// var workbook = excel.readFile( basepath+'files/Template_Todo.xls'); 
	// var yourSheetsName = workbook.SheetNames;
	// // console.log("Get the 1st Sheet Name (remember is an array): " + workbook.SheetNames[0]);
	// // console.log("Get Some Cell from it: " + workbook.Sheets[yourSheetsName[0]]['B3'].v);
	// // console.log(workbook.Sheets[yourSheetsName[0]]['B3'].v);
	// var sheet = workbook.Sheets[yourSheetsName[0]];
	// // console.log(workbook.SheetNames[1]);

	// // You can get the sheet as list of lists.
	// var options = { header : 1 }

	// // Or you  can get an object with column headers as keys.  
	// var options = { header : ['title', 'fName', 'sName' ,'address' ] }

	// // If options is empty or omitted, it should use the first-row headers by default. 
	// // However this doesn't seem to work with all Excel worksheets. 
	// var options = {}

	// // Generate the JSON like so:
	// var workbookJson = excel.utils.sheet_to_json( sheet, options );
	// console.log(workbookJson)
    
 //  },
  

});