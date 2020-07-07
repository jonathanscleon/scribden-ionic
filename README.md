# scribden-ionic

## Bugs
- Change update calls to only use updateable fields. Exclude id, created_at, updated_at fields

## Tech Debt
- Clean up use of Mudder; encapsulate in a service

## MVP Test TODO
- Auth
- Share items
- Redirects for form submissions for auth pages
- Reset password page that takes token provided by email
- Investigate auth constraints
- Lock down API for unregistered users

## MVP Launch 
- Add local notifications for reminders
- Use basic key/value store for keeping track of current reminders, in order to sync with shared reminders. Remove this once full SQLite sync is available.
- Search by tag
- Add UI for deleting behaviors
- Themes
- Add QuillJS to enable rich text formatting for notes
- Offline SQLite support
- Account optional, followed by syncing on sign up

## Next TODO
- Manage calendar events using reminders

## Warnings
- Race condition where fetchItem completes after fetchChecklist, wiping out the checklist information

Local Data integration
- Install cordova plugin for Sqlite: https://github.com/xpbrew/cordova-sqlite-storage#readme
- Setup migration infrastructure for initialization: https://blog.bradleygore.com/2015/09/26/cordova-sqlite-migrations/
- How to initalize DB: https://www.sitepoint.com/storing-local-data-in-a-cordova-app/
- Keep queries small: Retrieve item, then use the ID to retrieve relevant data
- If cordova plugin is available, use a separate thread (service workers?) to sync sqlite DB to backend API
- If cordova plugin is not available, use backend API directly

MVP action: Use backend API first
