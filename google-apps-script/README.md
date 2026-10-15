# Google Sheets form inbox

The website's forms post to their own API routes (`/api/enquiries`,
`/api/testimonials`, `/api/reviews`, `/api/privacy-requests`). Those routes
validate the data, then the website's **server** forwards it to this Google
Apps Script, which appends a row to the matching tab in your spreadsheet.

| Form type         | Sheet tab          | New rows start as | Published on the site?                             |
| ----------------- | ------------------ | ----------------- | -------------------------------------------------- |
| `enquiry`         | `Enquiries`        | New               | No                                                 |
| `testimonial`     | `Testimonials`     | Pending           | No — copy approved ones into `lib/testimonials.ts` |
| `product_review`  | `Reviews`          | Pending           | Only after you set Status to **Approved**          |
| `privacy_request` | `Privacy Requests` | New               | No                                                 |
| `order_enquiry`   | `Order Enquiries`  | New               | No                                                 |

Every tab starts with **Submitted At**, **Reference** and **Status** (a
dropdown), followed by the form's fields.

**Order Enquiries** come from the enquiry cart (`/api/order-enquiries`), just
before the customer is sent to WhatsApp. Each saree is its own row; all rows of
one enquiry share the same Reference (the enquiry ID, e.g. `JSE-7K3M9QXA`, also
shown in the customer's WhatsApp message) and repeat the customer name,
WhatsApp number, lead source (`Enquiry Cart`) and enquiry totals. Prices are
taken from the website's catalogue on the server, not from the visitor's
browser. A retry with the same enquiry ID is ignored, so a lead is never
stored twice.

## 1. Paste the script

1. Create a Google Sheet (for example "Jyoti Sarees — Website Forms") in the
   Google account that should own the data.
2. In that sheet, open **Extensions → Apps Script**.
3. Delete the sample code, paste the whole of `google-apps-script/Code.gs`,
   and click **Save**.

## 2. Configure the spreadsheet

Because the script was created from inside the sheet, it already writes to
that sheet — nothing else to configure.

Only if you created the script separately (from script.google.com): open
**Project Settings (gear icon) → Script properties → Add script property**,
name it `SPREADSHEET_ID`, and paste the ID from the sheet's URL
(`https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`). The ID stays
in the script's properties; it never goes in the website's `.env`.

Then create the tabs: choose **setupSheets** in the function menu at the top
of the editor, click **Run**, and approve the permission prompt. The four
tabs appear with headers and Status dropdowns. (They are also created
automatically on the first submission.)

## 3. Deploy as a web app

1. Click **Deploy → New deployment**, then the gear next to "Select type" →
   **Web app**.
2. **Execute as:** Me. **Who has access:** Anyone.
3. Click **Deploy** and copy the **Web app URL**. It must end in `/exec`, for
   example `https://script.google.com/macros/s/AKfy…/exec`.

"Anyone" is required because the website's server calls the script without
signing in to Google. This means the URL is **not private**: anyone who
obtains it can send requests to it. The website never shows the URL to
visitors, and the script only accepts the four known form types with their
expected fields, always saves new rows as New/Pending, and only ever returns
reviews you have approved — but rows could still be added by someone who has
the URL. Keep it out of public places, and if you see unexpected rows, create a
new deployment (new URL) and archive the old one under **Manage deployments**.

When you edit `Code.gs` later, use **Deploy → Manage deployments → Edit (pencil)
→ Version: New version → Deploy** so the same URL serves the new code.

## 4. Add the URL to the website

In the root `.env` file:

```bash
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfy…/exec
```

For the live site, add the same variable in your hosting provider's
environment settings and redeploy (values starting with `NEXT_PUBLIC_` are
fixed when the site is built).

## 5. Restart the development server

Stop `npm run dev` (Ctrl + C) and start it again so it picks up the new value.

## 6. Test each form

Submit each form once and check that a row appears in the right tab:

- **Contact enquiry** — `/contact` → Enquiries
- **Testimonial** — home page, "Share your experience" → Testimonials
- **Product review** — any saree page, "Write a Review" → Reviews (Pending,
  not visible on the site)
- **Privacy request** — `/privacy-requests` → Privacy Requests
- **Cart enquiry** — add two sarees to the enquiry cart, open `/cart`,
  **Proceed to Order**, enter a name and WhatsApp number, then **Confirm &
  Continue to WhatsApp** → Order Enquiries (one row per saree)

Treat the integration as live only after all five arrive. If the URL is
missing, wrong, or the script fails, the form shows an error and suggests
WhatsApp — it never reports success unless the script confirms the row was
saved.

## Moderating reviews

New reviews arrive in **Reviews** with Status **Pending** and are not shown on
the site. Change Status to **Approved** to publish one (its rating then counts
towards the saree's average), or **Rejected** to keep it hidden. The site
re-reads approved reviews about once a minute.

Testimonials are never published automatically; to feature one, add it to
`lib/testimonials.ts`.
