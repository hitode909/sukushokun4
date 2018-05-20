# sukushokun4

Sukushokun4 crawls URLs, take screenshots, and upload PNG(PC, smartphone) and PDF.

## Setup on Google API Dashboard

1. Create a new project on API Console
     - https://console.developers.google.com/
2. Enable Google Drive API
3. Create a service account on Google
    - Select role as editor.
4. Download the credential JSON file of your service account
    - One liner to minify JSON: `cat ~/Downloads/PATH_TO_SERVICE_ACCOUNT.json | ruby -rjson -e 'puts JSON.dump(JSON.parse(ARGF.read))' | pbcopy`

## Setup on Google Drive

1. Create a directory to store screenshots.
2. Invite the service account to Google Drive's folder.
    - It should looks like `***@***.iam.gserviceaccount.com`
    - Useful command: `cat ~/Downloads/PATH_TO_SERVICE_ACCOUNT.json | jq -r '.["client_email"]'`
3. Create directories which has URL as a name. Sukushokun will crawl these URLs.
   - Foe example: `https://example.com/`

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hitode909/sukushokun4/tree/master)

## Run locally

### Start cron

```
% npm install
% GOOGLE_CREDENTIAL=$(cat PATH_TO_YOUR_SERVICE_ACCOUNT.JSON) npm start
```

### Run capture manually

```
% npm install
% GOOGLE_CREDENTIAL=$(cat PATH_TO_YOUR_SERVICE_ACCOUNT.JSON) npm start
```
