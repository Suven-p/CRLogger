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

function parseDate(isoDate: string) {
  const MM = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const iso = isoDate.replace(
    /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.\d{3}(\w{1,3})/,
    ($0, $1, $2, $3, $4, $5, $6, $7) => {
      return (
        MM[$2 - 1] +
        ' ' +
        $3 +
        ' ' +
        $1 +
        ' ' +
        ($4 % 12) +
        ':' +
        $5 +
        ':' +
        $6 +
        (+$4 > 12 ? ' PM' : ' AM') +
        ' ' +
        ($7 === 'Z' ? 'GMT' : $7)
      );
    }
  );
  return new Date(iso);
}
