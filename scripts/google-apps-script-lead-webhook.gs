/**
 * ACD MOLD — Lead webhook for Google Sheets
 * ----------------------------------------------------------------------------
 * 1. Open your sheet:
 *      https://docs.google.com/spreadsheets/d/1yKPZ_-5oqV2PBj8hlwFikznDCiiHBkWC5uHhVsHfzjc/edit
 * 2. Extensions → Apps Script.
 * 3. DELETE the default Code.gs contents and paste THIS file in its place.
 * 4. Save (Ctrl/Cmd + S).
 * 5. Project Settings (left sidebar gear icon) → Script Properties → Add script property:
 *      SHARED_SECRET = (the same long random string you put in .env LEAD_WEBHOOK_SECRET)
 *      NOTIFY_EMAIL  = info@acdmold.com   (optional — set if you want email alerts)
 * 6. Click Deploy → New deployment.
 *      - Select type: Web app
 *      - Description: ACD Mold Lead Webhook
 *      - Execute as: Me
 *      - Who has access: Anyone   ← required so the website can POST to it
 * 7. Click Deploy. Authorize when prompted (it will warn that the script is
 *    "unverified" — that's expected because you wrote it; click Advanced → Go to project).
 * 8. Copy the Web App URL it gives you (looks like
 *      https://script.google.com/macros/s/AKfycbx.../exec
 *    ) and paste it into your .env file as GOOGLE_SHEETS_WEBHOOK_URL.
 * 9. Redeploy your Next.js site so it picks up the new env variable.
 *
 * Test the webhook from the Apps Script editor by running the `runTest` function
 * once — you should see a row appear in the sheet.
 * ----------------------------------------------------------------------------
 */

// The sheet tab name to write to. Default Google Sheets tab is "Sheet1".
// Your sheet's first tab appears to be "Leads" — adjust if different.
var SHEET_NAME = 'Leads';

// Header row that the script will create if the sheet is empty.
var HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Phone',
  'City',
  'Service',
  'Message',
  'IP',
  'User Agent',
  'Referer'
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');

    // Reject requests without the shared secret.
    var expected = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET') || '';
    if (!expected || body.secret !== expected) {
      return jsonResponse({ ok: false, error: 'unauthorized' }, 401);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Ensure header row exists.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var row = [
      body.timestamp || new Date().toISOString(),
      body.name || '',
      body.email || '',
      body.phone || '',
      body.city || '',
      body.service || '',
      body.message || '',
      body.ip || '',
      body.userAgent || '',
      body.referer || ''
    ];
    sheet.appendRow(row);

    sendNotification_(body);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

// Keep GET working so you can hit the URL in a browser to confirm it deployed.
function doGet() {
  return jsonResponse({ ok: true, status: 'ACD Mold lead webhook is live.' });
}

function sendNotification_(body) {
  try {
    var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
    if (!to) return;

    var subject = 'New ACD Mold Lead — ' + (body.name || 'unknown') + ' (' + (body.city || '') + ')';
    var lines = [
      'A new lead has been submitted from acdmold.com:',
      '',
      'Name:    ' + (body.name || ''),
      'Phone:   ' + (body.phone || ''),
      'Email:   ' + (body.email || ''),
      'City:    ' + (body.city || ''),
      'Service: ' + (body.service || ''),
      '',
      'Message:',
      body.message || '',
      '',
      '----',
      'Submitted: ' + (body.timestamp || ''),
      'IP:        ' + (body.ip || ''),
      'Referrer:  ' + (body.referer || ''),
      'UA:        ' + (body.userAgent || '')
    ];
    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: lines.join('\n'),
      replyTo: body.email || undefined
    });
  } catch (err) {
    // Don't fail the whole request just because email failed.
    Logger.log('sendNotification_ error: ' + err);
  }
}

function jsonResponse(obj, status) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Manual test — run from the Apps Script editor to confirm everything works.
function runTest() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        secret: PropertiesService.getScriptProperties().getProperty('SHARED_SECRET'),
        timestamp: new Date().toISOString(),
        name: 'Test Lead',
        email: 'test@example.com',
        phone: '(424) 555-0100',
        city: 'Encino',
        service: 'Mold Inspection',
        message: 'This is a test row inserted by runTest().',
        ip: '127.0.0.1',
        userAgent: 'Apps Script Test',
        referer: 'manual'
      })
    }
  };
  Logger.log(doPost(fakeEvent).getContent());
}
