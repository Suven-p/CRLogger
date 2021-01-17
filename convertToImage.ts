function spreadsheetToJPEG(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  pdfFileName: string
) {
  const CLOUDMERSIVE_KEY = PropertiesService.getUserProperties().getProperty(
    'CLOUDMERSIVE_KEY'
  );
  if (CLOUDMERSIVE_KEY === null) {
    throw new Error('Cloudmersive Api Key is not set.');
  }

  // Convert spreadsheet to pdf
  const apiUrl = 'https://api.cloudmersive.com/convert/pdf/to/jpg';
  const pdfBlob = spreadsheet.getBlob().getAs('application/pdf');
  pdfBlob.setName(pdfFileName);

  // Convert pdf to images using cloudmersive api
  const boundary = 'xxxformboundaryxxx';
  let data = '';
  data += '--' + boundary + '\r\n';
  data +=
    'Content-Disposition: form-data; name="inputFile"; filename="' +
    pdfBlob.getName() +
    '"\r\n';
  data += 'Content-Type:' + pdfBlob.getContentType() + '\r\n\r\n';
  const payload = Utilities.newBlob(data)
    .getBytes()
    .concat(pdfBlob.getBytes())
    .concat(Utilities.newBlob('\r\n--' + boundary + '--').getBytes());
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'multipart/form-data; boundary=' + boundary,
    payload,
    headers: {
      Apikey: CLOUDMERSIVE_KEY,
    },
    muteHttpExceptions: true,
  };
  const response = UrlFetchApp.fetch(apiUrl, options);
  const parsedResponse: CloudMersiveResponse = JSON.parse(
    response.getContentText()
  );

  // Convert base64 encoded strings from api to image/jpeg blobs
  const encodedImages = parsedResponse.JpgResultPages;
  const images: GoogleAppsScript.Base.Blob[] = [];
  encodedImages.forEach((encodedImage, index) => {
    const decodedImage = Utilities.base64Decode(
      encodedImage.Content,
      Utilities.Charset.UTF_8
    );
    const blob = Utilities.newBlob(
      decodedImage,
      'image/jpeg',
      `${pdfFileName}_${index + 1}`
    );
    images.push(blob);
  });
  return images;
}
