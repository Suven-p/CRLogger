function setCRAuthToken() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    'Set Auth Token',
    'Please enter your clash royale api key:',
    ui.ButtonSet.OK_CANCEL
  );

  // Process the user's response.
  const button = result.getSelectedButton();
  const value = result.getResponseText();
  if (button === ui.Button.OK) {
    // User clicked "OK".
    PropertiesService.getUserProperties().setProperty('CR_AUTHTOKEN', value);
  } else if (button === ui.Button.CANCEL || button === ui.Button.CLOSE) {
    // User clicked "Cancel".
    if (
      PropertiesService.getUserProperties().getProperty('CR_AUTHTOKEN') === null
    ) {
      ui.alert(
        'Clash Royale token is not set. Data cannot be updated if you have not set valid authorization token.'
      );
    }
  }
}

function setCloudmersiveAuthToken() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    'Set Auth Token',
    'Please enter your cloudmersive api key:',
    ui.ButtonSet.OK_CANCEL
  );

  // Process the user's response.
  const button = result.getSelectedButton();
  const value = result.getResponseText();
  if (button === ui.Button.OK) {
    // User clicked "OK".
    PropertiesService.getUserProperties().setProperty(
      'CLOUDMERSIVE_KEY',
      value
    );
  } else if (button === ui.Button.CANCEL || button === ui.Button.CLOSE) {
    // User clicked "Cancel".
    if (
      PropertiesService.getUserProperties().getProperty('CLOUDMERSIVE_KEY') ===
      null
    ) {
      ui.alert(
        'Cloudmersive token is not set. You cannot export image to discord if you have not set valid authorization token.'
      );
    }
  }
}

function setDiscordWebhookUrl() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    'Set Webhook URL',
    'Please enter webhook url:',
    ui.ButtonSet.OK_CANCEL
  );

  // Process the user's response.
  const button = result.getSelectedButton();
  const value = result.getResponseText();
  if (button === ui.Button.OK) {
    // User clicked "OK".
    PropertiesService.getDocumentProperties().setProperty(
      'DISCORD_WEBHOOK_URL',
      value
    );
  } else if (button === ui.Button.CANCEL || button === ui.Button.CLOSE) {
    // User clicked "Cancel".
    if (
      PropertiesService.getDocumentProperties().getProperty(
        'DISCORD_WEBHOOK_URL'
      ) === null
    ) {
      ui.alert(
        'Webhook URL is not set. You cannot export image to discord if you have not set valid webhook url.'
      );
    }
  }
}
