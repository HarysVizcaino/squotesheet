/*
Quote Maker
Author: Richard Blondet <richardblondet.com>
*/
var TITLE = 'Cotiza ';
var SHEET_ID = '';

function doGet() {
  var output = HtmlService.createTemplateFromFile('INDEX');
  output.title = TITLE;  
  
  return output.evaluate();  
}

function require( filename ) {
  return HtmlService.createHtmlOutputFromFile( filename ).getContent();
}

function getData() {
  var response = {};
  response.data = [];
  var spreadsheet = SpreadsheetApp.openByUrl( SHEET_ID );
  var sheets = spreadsheet.getSheets();
  
  for(var iterator=0; iterator < sheets.length; iterator+=1) {
    var sheet = sheets[iterator];
    var sheetName = sheet.getName();
    
    if( sheetName != 'config') {
        
      var currentSheet = spreadsheet.getSheetByName( sheetName );
      var currentSheetData = currentSheet.getDataRange().getValues();
      var object = {};
      
      object.name = sheetName;
      object.values = [];
      
      for(var xteator=1; xteator < currentSheetData.length; xteator+=1) {
        object.values.push({ 
          concept: currentSheetData[xteator][0],
          description: currentSheetData[xteator][1],
          price: currentSheetData[xteator][2],
          step: currentSheetData[xteator][3]
        });
      }
      response.data.push(object);
    }
  }
  
  var configSheet = spreadsheet.getSheetByName('config');
  var configData = configSheet.getDataRange().getValues();
  
  for(var it=1; it<configData.length; it+=1) {
    response.name = ( configData[it][0] ) ? configData[it][0] : false;
    response.description = ( configData[it][1] ) ? configData[it][1] : false;
    response.color = ( configData[it][3] ) ? configData[it][3] : false;
    response.comission = ( configData[it][4] ) ? configData[it][4] : false;
    response.discount = ( configData[it][5] ) ? configData[it][5] : false;
    response.tax = ( configData[it][6] ) ? configData[it][6] : false;
    if( configData[it][2] ) {
      var url = 'http://drive.google.com/uc?export=view&id=';
      response.logo = url . configData[it][6];
    }
  }
  
  return response;
  
}
