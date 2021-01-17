class ClashRoyaleLogger {
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  clanTag: string;
  positions: { clan_info: Position; members_info: Position };

  constructor() {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    this.clanTag = encodeURIComponent(
      PropertiesService.getDocumentProperties().getProperty('CLAN_TAG')
    );
    this.positions = {
      clan_info: { row: 2, col: 5 },
      members_info: { row: 8, col: 1 },
    };
  }

  setup() {
    // Check if sheets exist and if they do not create them
    // Only for new sheets but does not set conditional formatting so make copy of existing spreadsheets
    const sheets = ['Summary', 'Detailed'];
    for (let i = 1; i <= 10; i++) {
      sheets.push(i.toString(10));
    }
    for (const sheet of sheets) {
      const exists = this.spreadsheet.getSheetByName(sheet);
      if (!exists) {
        this.spreadsheet.insertSheet(sheet);
      }
    }
  }

  setClanInfo(sheetName: string, position: Position) {
    // Set basic clan info in summary page
    const clanData = this.getAPIData('clans/' + this.clanTag);
    const data = [
      ['Name', clanData.name],
      ['Tag', clanData.tag],
      ['Score', clanData.clanScore],
      ['Members', clanData.members],
      ['Donations', clanData.donationsPerWeek],
    ];
    recordData(data, sheetName, position);
  }

  setMembersData(sheetName: string, position: Position) {
    // Set members data on summary page
    // Get member data
    let rows = [
      [
        'Rank',
        'Name',
        'Tag',
        'Role',
        'Level',
        'Trophies',
        'Donations',
        'Received',
      ],
    ];
    const members: ClanMember[] = this.getAPIData(
      `clans/${this.clanTag}/members`
    ).items;
    members.forEach((data) => {
      rows.push([
        data.clanRank.toString(),
        data.name,
        data.tag,
        data.role,
        data.expLevel.toString(),
        data.trophies.toString(),
        data.donations.toString(),
        data.donationsReceived.toString(),
      ]);
    });
    // If there are less than 50 members put empty rows to clear rest of the rows which may contain old data
    const emprtRow = Array(rows[0].length).fill('');
    const emptyRows = Array(50 - members.length).fill(emprtRow);
    rows = rows.concat(emptyRows);
    recordData(rows, sheetName, position);
  }

  setDateTime(
    sheetName: string,
    datePosition: Position,
    timePosition: Position
  ) {
    const curDate = new Date();
    const date = Utilities.formatDate(curDate, 'GMT', 'MMMM dd, yyy');
    const time = Utilities.formatDate(curDate, 'GMT', 'HH:mm:ss');
    if (
      !timePosition ||
      (datePosition.row === timePosition.row &&
        datePosition.col === timePosition.col)
    ) {
      this.spreadsheet
        .getSheetByName(sheetName)
        .getRange(datePosition.row, datePosition.col)
        .setValue(date + time);
    } else {
      this.spreadsheet
        .getSheetByName(sheetName)
        .getRange(datePosition.row, datePosition.col)
        .setValue(date);
      this.spreadsheet
        .getSheetByName(sheetName)
        .getRange(timePosition.row, timePosition.col)
        .setValue(time);
    }
  }
  static get CR_AUTH_TOKEN() {
    const authCode = PropertiesService.getUserProperties().getProperty(
      'CR_AUTHTOKEN'
    );
    return authCode;
  }

  static get CLAN_TAG() {
    const clantag = PropertiesService.getDocumentProperties().getProperty(
      'CLAN_TAG'
    );
    return clantag;
  }

  // Get clash royale data using royale api proxy
  getAPIData(endpoint: string) {
    if (ClashRoyaleLogger.CR_AUTH_TOKEN === null) {
      throw new Error('Clash Royale Authorization Token is not set');
    }
    const options = {
      headers: {
        authorization: `Bearer ${ClashRoyaleLogger.CR_AUTH_TOKEN}`,
      },
      muteHTTPExceptions: true,
    };
    const url = `https://proxy.royaleapi.dev/v1/${endpoint}`;
    // Clash royale official API requires authoried IP which is not compatible with google scripts as google scripts does not
    // provide static IP address. Hence uses royale-api proxy with 128.128.128.128 as registered IP
    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  }
}
