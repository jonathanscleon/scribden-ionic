# scribden-ionic

## TODO
- Install date-fns and format reminder preview
- Add local notifications for reminders
- Add UI for deleting behaviors
- Add QuillJS to enable rich text formatting for notes
- Retain user defined sort order for check list items
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
