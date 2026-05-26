# Deploying the Apps Script backend

## 1. Open the script editor

Open your spreadsheet:
https://docs.google.com/spreadsheets/d/1Ra42Zbj7fKQeKFJZwPKDa46Z4ze_zRfsUPRUzHEBSjA/edit

Menu: **Extensions → Apps Script**

## 2. Paste the code

In the editor, replace any existing contents of `Code.gs` with the contents of [`Code.gs`](Code.gs) in this folder. Save (⌘S).

## 3. Authorise

Click **Run** on the `doGet` function once. Google will ask you to authorise the script — accept the scopes (it needs access to spreadsheets only).

## 4. Deploy as a Web App

- Click **Deploy → New deployment**
- Gear icon → choose **Web app**
- Settings:
  - **Description:** Afitpilot Coach Outreach v1
  - **Execute as:** Me (your account)
  - **Who has access:** Anyone
- Click **Deploy**
- Copy the **Web app URL** (ends in `/exec`)

## 5. Wire the URL into the app

Open [`../index.html`](../index.html) and replace the value of `SCRIPT_URL` (around line 203) with the URL you just copied.

## 6. Test

Open `index.html` in a browser, fill the form, click **↗ Add to Outreach Log**, then check the sheet. A new row should appear.

## Updating later

If you change `Code.gs`, you have two options:

- **Same URL (recommended):** Deploy → Manage deployments → pencil icon on the active deployment → Version: New version → Deploy. URL stays the same.
- **New URL:** Deploy → New deployment. You'll need to update `SCRIPT_URL` in `index.html` again.
