/**
 * Free lead capture into a Google Sheet.
 *
 * 1. Create a Google Sheet. Extensions > Apps Script. Paste this file.
 * 2. Deploy > New deployment > Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 3. Copy the web app URL into VITE_FORMS_ENDPOINT in .env and rebuild.
 *
 * Each form type (phone, newsletter, contact) gets its own tab.
 */
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(data.type) || ss.insertSheet(data.type);
  var columns = ['submittedAt', 'name', 'phone', 'email', 'message', 'consent', 'page'];
  if (sheet.getLastRow() === 0) sheet.appendRow(columns);
  sheet.appendRow(columns.map(function (c) { return data[c] === undefined ? '' : String(data[c]); }));
  return ContentService.createTextOutput('ok');
}
