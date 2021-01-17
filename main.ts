function main() {
  updateSheet();
}

function updateSheet() {
  const clashRoyaleLogger = new ClashRoyaleLogger();
  const position: Position = { row: 2, col: 5 };
  clashRoyaleLogger.setClanInfo('Summary', position);
  clashRoyaleLogger.setMembersData('Summary', { row: 8, col: 1 });
  clashRoyaleLogger.setDateTime(
    'Summary',
    { row: 5, col: 10 },
    { row: 5, col: 11 }
  );
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Update data').addItem('Update data', 'main').addToUi();

  ui.createMenu('Send')
    .addItem('Send image to Discord', 'uploadImageToDiscord')
    .addToUi();

  ui.createMenu('Set secrets')
    .addItem('Set Clash Royale auth token', 'setCRAuthToken')
    .addItem('Set Cloudmersive auth token', 'setCloudmersiveAuthToken')
    .addItem('Set Discord Webhook URL', 'setDiscordWebhookUrl')
    .addToUi();

  const response = ui.prompt(
    'Do you want to refresh data?',
    ui.ButtonSet.YES_NO
  );
  if (response.getSelectedButton() === ui.Button.YES) {
    main();
  }
}
