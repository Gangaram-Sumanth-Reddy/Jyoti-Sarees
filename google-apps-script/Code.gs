/**
 * Jyoti Sarees — website form inbox for Google Sheets.
 *
 * The website's server validates each form, then posts it here. Each form
 * type is appended to its own tab:
 *
 *   enquiry          -> "Enquiries"         (Status: New)
 *   testimonial      -> "Testimonials"      (Status: Pending — publish manually)
 *   product_review   -> "Reviews"           (Status: Pending — set Approved to publish)
 *   privacy_request  -> "Privacy Requests"  (Status: New)
 *
 * New rows always get the initial status above, whatever the request says,
 * so nothing is published without someone changing Status in the sheet.
 *
 * Setup: see google-apps-script/README.md.
 *
 * Script property (Project Settings -> Script properties), optional:
 *   SPREADSHEET_ID  Only needed if this script was not created from inside the
 *                   target spreadsheet (Extensions -> Apps Script).
 */

var FORMS = {
  enquiry: {
    sheet: 'Enquiries',
    initialStatus: 'New',
    statuses: ['New', 'Contacted', 'Closed'],
    required: ['fullName', 'phone', 'message'],
    columns: [
      ['fullName', 'Full Name'],
      ['countryCode', 'Country Code'],
      ['phone', 'Phone'],
      ['email', 'Email'],
      ['state', 'State'],
      ['city', 'City'],
      ['pincode', 'PIN Code'],
      ['address', 'Address'],
      ['message', 'Message'],
      ['policyVersion', 'Privacy Policy Version'],
    ],
  },
  testimonial: {
    sheet: 'Testimonials',
    initialStatus: 'Pending',
    statuses: ['Pending', 'Approved', 'Rejected'],
    required: ['name', 'message'],
    columns: [
      ['name', 'Name'],
      ['city', 'City'],
      ['saree', 'Saree'],
      ['message', 'Testimonial'],
      ['publicationConsent', 'Publication Consent'],
      ['consentText', 'Consent Text'],
      ['policyVersion', 'Privacy Policy Version'],
    ],
  },
  product_review: {
    sheet: 'Reviews',
    initialStatus: 'Pending',
    statuses: ['Pending', 'Approved', 'Rejected'],
    required: ['productSlug', 'rating', 'name', 'title', 'review'],
    columns: [
      ['productSlug', 'Product Slug'],
      ['productName', 'Product'],
      ['rating', 'Rating'],
      ['name', 'Name'],
      ['title', 'Title'],
      ['review', 'Review'],
      ['consentText', 'Consent Text'],
      ['policyVersion', 'Privacy Policy Version'],
    ],
  },
  privacy_request: {
    sheet: 'Privacy Requests',
    initialStatus: 'New',
    statuses: ['New', 'In Progress', 'Completed'],
    required: ['name', 'contact', 'requestType', 'description'],
    columns: [
      ['name', 'Name'],
      ['contact', 'Contact'],
      ['requestType', 'Request Type'],
      ['description', 'Details'],
      ['policyVersion', 'Privacy Policy Version'],
    ],
  },
};

var FIXED_HEADERS = ['Submitted At', 'Reference', 'Status'];
var MAX_BODY_CHARS = 20000;
var MAX_FIELD_CHARS = 5000;

/** Health check only. Never returns submission data. */
function doGet() {
  return json_({ ok: true, service: 'jyoti-sarees-forms' });
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > MAX_BODY_CHARS) return json_({ ok: false, error: 'bad_request' });

    var body;
    try {
      body = JSON.parse(raw);
    } catch (err) {
      return json_({ ok: false, error: 'bad_request' });
    }
    if (!body || typeof body !== 'object') return json_({ ok: false, error: 'bad_request' });

    if (body.action === 'append') return json_(append_(body));
    if (body.action === 'listApprovedReviews') return json_(listApprovedReviews_());
    return json_({ ok: false, error: 'unknown_action' });
  } catch (err) {
    console.error('doPost failed: ' + (err && err.message));
    return json_({ ok: false, error: 'server_error' });
  }
}

/** Run once from the editor to create the tabs and grant permissions. */
function setupSheets() {
  Object.keys(FORMS).forEach(function (formType) {
    getSheet_(FORMS[formType]);
  });
  console.log('Tabs ready: ' + Object.keys(FORMS).map(function (k) { return FORMS[k].sheet; }).join(', '));
}

function append_(body) {
  var form = FORMS[body.formType];
  var reference = String(body.reference || '');
  if (!form || !/^[A-Z]{2,4}-[A-Z0-9]{8}$/.test(reference) || !isValidData_(form, body.data)) {
    return { ok: false, error: 'bad_request' };
  }

  var submittedAt = new Date(body.submittedAt);
  if (isNaN(submittedAt.getTime())) submittedAt = new Date();

  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var sheet = getSheet_(form);
    if (hasReference_(sheet, reference)) return { ok: true, duplicate: true };

    var row = [submittedAt, reference, form.initialStatus];
    form.columns.forEach(function (column) {
      row.push(cell_(body.data[column[0]]));
    });
    sheet.appendRow(row);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

/** Only rows whose Status is exactly "Approved". Pending and rejected rows never leave the sheet. */
function listApprovedReviews_() {
  var form = FORMS.product_review;
  var sheet = getSheet_(form);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return { ok: true, reviews: [] };

  var headers = FIXED_HEADERS.concat(form.columns.map(function (c) { return c[1]; }));
  var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  var index = {};
  headers.forEach(function (header, i) { index[header] = i; });

  var reviews = [];
  values.forEach(function (row) {
    if (String(row[index.Status]).trim().toLowerCase() !== 'approved') return;
    var submitted = row[index['Submitted At']];
    reviews.push({
      reference: String(row[index.Reference]),
      productSlug: String(row[index['Product Slug']]),
      rating: Number(row[index.Rating]),
      name: String(row[index.Name]),
      title: String(row[index.Title]),
      body: String(row[index.Review]),
      submittedAt: submitted instanceof Date ? submitted.toISOString() : String(submitted),
    });
  });
  return { ok: true, reviews: reviews };
}

function getSheet_(form) {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  var spreadsheet = spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('No spreadsheet: bind this script to a sheet or set SPREADSHEET_ID.');

  var sheet = spreadsheet.getSheetByName(form.sheet);
  if (sheet) return sheet;

  sheet = spreadsheet.insertSheet(form.sheet);
  var headers = FIXED_HEADERS.concat(form.columns.map(function (c) { return c[1]; }));
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat('dd mmm yyyy, hh:mm');
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(form.statuses, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 3, sheet.getMaxRows() - 1, 1).setDataValidation(statusRule);
  return sheet;
}

function hasReference_(sheet, reference) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  return sheet
    .getRange(2, 2, lastRow - 1, 1)
    .createTextFinder(reference)
    .matchEntireCell(true)
    .findNext() !== null;
}

/**
 * Stores values as plain data: text that could be read as a formula, or
 * numbers with a leading zero (phone numbers), is prefixed with an apostrophe.
 */
function cell_(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return isFinite(value) ? value : '';
  var text = String(value).slice(0, MAX_FIELD_CHARS);
  if (/^[=+\-@\t\r]/.test(text) || /^0\d/.test(text)) return "'" + text;
  return text;
}

/**
 * Second line of defence behind the website's own validation: only known
 * fields of simple types, required fields present, and a whole-number rating
 * from 1 to 5 for reviews.
 */
function isValidData_(form, data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  var known = {};
  form.columns.forEach(function (column) { known[column[0]] = true; });
  for (var key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
    if (!known[key]) return false;
    var value = data[key];
    if (value !== null && ['string', 'number', 'boolean'].indexOf(typeof value) === -1) return false;
  }
  for (var i = 0; i < form.required.length; i++) {
    var required = data[form.required[i]];
    if (required === null || required === undefined || String(required).trim() === '') return false;
  }
  if (form === FORMS.product_review) {
    var rating = data.rating;
    if (typeof rating !== 'number' || rating % 1 !== 0 || rating < 1 || rating > 5) return false;
  }
  return true;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
