# sukushokun4

Sukushokun4 crawls URLs, take screenshots, and upload PNG(PC, smartphone) and PDF.

## Setup on Google API Dashboard

1. Create a new project on API Console
     - https://console.developers.google.com/
2. Enable Google Drive API
3. Create a service account on Google
4. Download the credential JSON file of your service account
    - This will set to heroku's

## Setup on Google Drive

1. Create a directory to store screenshots.
2. Invite the service account to Google Drive's folder.
    - It should looks like `***@***.iam.gserviceaccount.com`
3. Create directories which has URL as a name. Sukushokun will crawl these URLs.
   - Foe example: `https://example.com/`

## Deploy to Heroku

(BUTTON HERE)

## Run locally

```
% npm install
% GOOGLE_CREDENTIAL=$(cat PATH_TO_YOUR_SERVICE_ACCOUNT.JSON) npm start
```
