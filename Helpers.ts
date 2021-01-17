function recordRow(data, sheetName: string, position: Position) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  sheet.getRange(position.row, position.col, 1, data.length).setValues([data]);
}

function recordData(data, sheetName: string, position: Position) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  sheet
    .getRange(position.row, position.col, data.length, data[0].length)
    .setValues(data);
}

function updateFile(fileName: string, newBlob: GoogleAppsScript.Base.Blob) {
  const files = DriveApp.getFilesByName(fileName);
  let currentFile: GoogleAppsScript.Drive.File;
  if (files.hasNext()) {
    currentFile = files.next();
    Drive.Files.update(
      {
        title: currentFile.getName(),
        mimeType: currentFile.getMimeType(),
      },
      currentFile.getId(),
      newBlob
    );
  } else {
    currentFile = DriveApp.createFile(newBlob);
  }
  return currentFile;
}
