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
 *   order_enquiry    -> "Order Enquiries"   (Status: New)
 *
 * An order enquiry (from the website's enquiry cart) is written as one row
 * per saree. All rows of one enquiry share its Reference (the enquiry ID,
 * e.g. JSE-7K3M9QXA) and repeat the customer details and enquiry totals.
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
  order_enquiry: {
    sheet: 'Order Enquiries',
    initialStatus: 'New',
    statuses: ['New', 'Contacted', 'Confirmed', 'Closed'],
    required: ['leadSource', 'fullName', 'whatsapp', 'totalDesigns', 'totalQuantity', 'enquiryTotal'],
    columns: [
      ['leadSource', 'Lead Source'],
      ['fullName', 'Customer Name'],
      ['whatsapp', 'WhatsApp Number'],
    ],
    // One row per saree, between the customer columns and the enquiry totals.
    itemColumns: [
      ['itemNo', 'Item No.'],
      ['productName', 'Product'],
      ['sku', 'SKU'],
      ['colour', 'Colour'],
      ['quantity', 'Quantity'],
      ['mrp', 'MRP (₹)'],
      ['discount', 'Discount per Saree (₹)'],
      ['price', 'Price per Saree (₹)'],
      ['subtotal', 'Item Subtotal (₹)'],
      ['productUrl', 'Product URL'],
    ],
    itemRequired: ['itemNo', 'productName', 'sku', 'quantity', 'price', 'subtotal'],
    summaryColumns: [
      ['totalDesigns', 'Total Designs'],
      ['totalQuantity', 'Total Quantity'],
      ['totalMrp', 'Total MRP (₹)'],
      ['totalSavings', 'Total Savings (₹)'],
      ['enquiryTotal', 'Enquiry Total (₹)'],
      ['policyVersion', 'Privacy Policy Version'],
    ],
    currencyHeaders: [
      'MRP (₹)',
      'Discount per Saree (₹)',
      'Price per Saree (₹)',
      'Item Subtotal (₹)',
      'Total MRP (₹)',
      'Total Savings (₹)',
      'Enquiry Total (₹)',
    ],
    maxItems: 40,
  },
};

var FIXED_HEADERS = ['Submitted At', 'Reference', 'Status'];
var MAX_BODY_CHARS = 60000;
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

    if (form.itemColumns) {
      var rows = itemRows_(form, submittedAt, reference, body.data);
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
      return { ok: true, rows: rows.length };
    }

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

/** One row per item: customer columns, the item's columns, then the enquiry totals. */
function itemRows_(form, submittedAt, reference, data) {
  var lead = [submittedAt, reference, form.initialStatus];
  form.columns.forEach(function (column) {
    lead.push(cell_(data[column[0]]));
  });
  var totals = form.summaryColumns.map(function (column) {
    return cell_(data[column[0]]);
  });
  return data.items.map(function (item) {
    var cells = form.itemColumns.map(function (column) {
      return cell_(item[column[0]]);
    });
    return lead.concat(cells, totals);
  });
}

function headers_(form) {
  return FIXED_HEADERS.concat(
    form.columns.map(function (c) { return c[1]; }),
    (form.itemColumns || []).map(function (c) { return c[1]; }),
    (form.summaryColumns || []).map(function (c) { return c[1]; })
  );
}

/** Only rows whose Status is exactly "Approved". Pending and rejected rows never leave the sheet. */
function listApprovedReviews_() {
  var form = FORMS.product_review;
  var sheet = getSheet_(form);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return { ok: true, reviews: [] };

  var headers = headers_(form);
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
  var headers = headers_(form);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat('dd mmm yyyy, hh:mm');
  (form.currencyHeaders || []).forEach(function (header) {
    var column = headers.indexOf(header) + 1;
    if (column > 0) sheet.getRange(2, column, sheet.getMaxRows() - 1, 1).setNumberFormat('#,##0');
  });
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
  var columns = form.columns.concat(form.summaryColumns || []);
  if (!isSimpleRecord_(data, columns, form.itemColumns ? 'items' : null)) return false;
  if (!hasRequired_(data, form.required)) return false;
  if (form.itemColumns) {
    var items = data.items;
    if (!Array.isArray(items) || items.length === 0 || items.length > form.maxItems) return false;
    for (var j = 0; j < items.length; j++) {
      if (!isSimpleRecord_(items[j], form.itemColumns, null)) return false;
      if (!hasRequired_(items[j], form.itemRequired)) return false;
      var quantity = items[j].quantity;
      if (typeof quantity !== 'number' || quantity % 1 !== 0 || quantity < 1) return false;
    }
  }
  if (form === FORMS.product_review) {
    var rating = data.rating;
    if (typeof rating !== 'number' || rating % 1 !== 0 || rating < 1 || rating > 5) return false;
  }
  return true;
}

/** An object holding only the given columns (plus `listKey`, checked by the caller), with simple values. */
function isSimpleRecord_(record, columns, listKey) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return false;
  var known = {};
  columns.forEach(function (column) { known[column[0]] = true; });
  for (var key in record) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
    if (key === listKey) continue;
    if (!known[key]) return false;
    var value = record[key];
    if (value !== null && ['string', 'number', 'boolean'].indexOf(typeof value) === -1) return false;
  }
  return true;
}

function hasRequired_(record, required) {
  for (var i = 0; i < required.length; i++) {
    var value = record[required[i]];
    if (value === null || value === undefined || String(value).trim() === '') return false;
  }
  return true;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
