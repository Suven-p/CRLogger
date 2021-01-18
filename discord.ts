function uploadImageToDiscord() {
  const DISCORD_WEBHOOK_URL = PropertiesService.getDocumentProperties().getProperty(
    'DISCORD_WEBHOOK_URL'
  );
  const WEBHOOK_BOT_USERNAME = 'Academy Logger';
  const PDF_FILE_NAME = 'CRLogger-Academy.pdf';
  const IMAGE_FILE_NAME = 'CRLogger-Academy.jpg';

  if (DISCORD_WEBHOOK_URL === null) {
    throw Error(
      'Dicord Webhook Url not set. I cannot send image without proper address :('
    );
  }

  const images = spreadsheetToJPEG(
    SpreadsheetApp.getActiveSpreadsheet(),
    PDF_FILE_NAME
  );
  const blob = images[0].getAs('image/jpeg'); // Get only summary page
  blob.setName(IMAGE_FILE_NAME);

  const payload: WebHookFormData = {
    username: WEBHOOK_BOT_USERNAME,
    allowed_mentions: {
      parse: ['roles', 'users'],
    },
    payload_json: JSON.stringify({ content: new Date().toString() }),
  };

  postToDiscord(DISCORD_WEBHOOK_URL, blob, payload);
}

function postToDiscord(
  webhookUrl: string,
  blob: GoogleAppsScript.Base.Blob,
  payloadData: WebHookFormData
) {
  const boundary = 'xxxdiscordformboundaryxxx';
  const payload = constructFormData(boundary, payloadData, blob);
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'multipart/form-data; boundary=' + boundary,
    payload,
    muteHttpExceptions: false,
  };
  const response = UrlFetchApp.fetch(webhookUrl, options).getContentText();
  if (response) {
    Logger.log('From discord: ', response);
  }
}

function postJSONToDiscord(webhookUrl: string, payloadObj: WebHookData) {
  const payloadJSON = JSON.stringify(payloadObj);
  const payload = {
    payload_json: JSON.stringify(payloadJSON),
  };
  return postToDiscord(webhookUrl, null, payload);
}
