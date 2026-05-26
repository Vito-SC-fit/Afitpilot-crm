/**
 * Afitpilot — Coach Outreach Web App backend.
 *
 * Receives POSTs from index.html and appends a row to the "Outreach Log"
 * tab of the bound spreadsheet.
 *
 * Deploy: Extensions → Apps Script → paste this file → Deploy → New deployment
 *   → type: Web app, execute as: Me, who has access: Anyone.
 * Copy the resulting /exec URL into SCRIPT_URL in index.html.
 */

const SHEET_NAME = 'Outreach Log';
const SPREADSHEET_ID = '1Ra42Zbj7fKQeKFJZwPKDa46Z4ze_zRfsUPRUzHEBSjA';

function doPost(e) {
  try {
    const raw = (e && e.parameter && e.parameter.data) ? e.parameter.data : '{}';
    const coach = JSON.parse(raw);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonOut({ ok: false, error: 'Sheet "' + SHEET_NAME + '" not found' });
    }

    // Column order in the sheet:
    // IG Handle | Name | Followers | Type/Role | Language | Niche/Angle |
    // DM Hook Used | Date Sent | Reply (Y/N) | Reply Type | Call Booked |
    // Call Done | Notes | Follow-up Date
    const row = [
      coach.handle    || '',
      coach.name      || '',
      coach.followers || '',
      coach.type      || '',
      coach.language  || '',
      coach.niche     || '',
      coach.hook      || '',
      coach.date      || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy'),
      '', // Reply (Y/N) — filled manually
      '', // Reply Type — filled manually
      '', // Call Booked — filled manually
      '', // Call Done — filled manually
      coach.notes     || '', // Notes column holds the edited DM
      ''  // Follow-up Date — filled manually
    ];

    sheet.appendRow(row);
    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonOut({ ok: true, message: 'Afitpilot outreach endpoint live' });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
