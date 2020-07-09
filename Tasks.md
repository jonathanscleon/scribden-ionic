//////////////////////////////////////////////////
// Ticket: SD-
// Name: 
// Status: Queue
// Tag: 
// Description: 
//
// Acceptance:
// 1. 
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-7
// Name: Deploy web application
// Status: In Progress
// Tag: #function
// Description: Web application now works on web.
//
// Acceptance:
// 1. Application connects to scribden.com
// 2. Application works on the server.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-8
// Name: Deploy test iOS app
// Status: Queue
// Tag: #function
// Description: Use XCode to deploy app to my
// device.
//
// Acceptance:
// 1. Application works from the device.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-29
// Name: Configure builds
// Status: Queue
// Tag: #function
// Description: Configure repo so that web and
// app deployments can be done easily.
//
// Acceptance:
// 1. Web can be deployed reliably and separately
//    from app.
// 2. App can be deployed reliably and separately
//    from web.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-30
// Name: Request email confirmation
// Status: Queue
// Tag: #function
// Description: Create a page that suggests
// the user to check their email and confirm.
//
// Acceptance:
// 1. User is asked to confirm their email
//    after registering.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-31
// Name: Accept email confirmation
// Status: Queue
// Tag: #function
// Description: Create a page that accepts the
// confirmation token and redirects them to the
// home page.
//
// Acceptance:
// 1. Create email confirmation acceptance page.
// 2. Update email template to use the correct 
//    page.
// 3. User is redirected to the home page after
//    being confirmed.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-9
// Name: Reset password
// Status: Queue
// Tag: #mvp
// Description: End-to-end password reset flow.
//
// Acceptance:
// 1. User can request a password reset.
// 2. User receives an email for the password reset.
// 3. User can reset their password using the token.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-10
// Name: Fix update calls
// Status: Queue
// Tag: #bug
// Description: Change update calls to only use
// updateable fields. Exclude id, created_at,
// updated_at fields
//
// Acceptance:
// 1. Update calls in services only call
//    updateable fields.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-11
// Name: Refactor mudder into a function
// Status: Queue
// Tag: #tech-debt
// Description: 
//
// Acceptance:
// 1. Mudder is abstracted away to a function.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-12
// Name: Share items
// Status: Queue
// Tag: #mvp
// Description: Provide ability to share items
// with others.
//
// Acceptance:
// 1. Click share and provide a user's email to
//    share with them.
// 2. Investigate email notifications.
// 3. Shared items populate under a Shared folder.
// 4. Share user cannot delete behaviors.
// 5. Share user can update behaviors.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-13
// Name: Add local app reminder
// Status: Queue
// Tag: #mvp
// Description: Reminders trigger on an iOS device
//
// Acceptance:
// 1. Reminder triggers on an iOS deivce at the
//    correct time and date.
// 2. App does not request permission for
//    notifications until a reminder is attached.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-14
// Name: Reminders sync
// Status: Queue
// Tag: #mvp
// Description: App checks if reminder has been
// set, and adds them if it hasn't.
//
// Acceptance:
// 1. Reminder is made on web and synced correctly
//    on iOS.
// 2. Reminder is made on a shared item, and the
//    share user gets a notification
//    (after syncing).
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-15
// Name: Web reminder
// Status: Queue
// Tag: #mvp
// Description: Reminders render on the browser.
//
// Acceptance:
// 1. After setting a reminder, the reminder
//    triggers on the browser.
// 2. Permission for reminder is requested when
//    trying to set a reminder.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-16
// Name: Clicking on tags lists tagged items
// Status: Queue
// Tag: #mvp
// Description: When looking at an item's details,
// clicking a tag will show a list of items tagged
// with the same tag.
//
// Acceptance:
// 1. A list of items filtered by a tag appears.
// 2. The tag is shown in the searchbar.
// 3. It works for web.
// 4. It works for iOS.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-17
// Name: Enhanced search
// Status: Queue
// Tag: #mvp
// Description: User can use searchbar either item
// titles or tags. Full text search not supported
// at this time.
//
// Acceptance:
// 1. Searching for item names will autopopulate
//    results.
// 2. Searching for tags will autopopulate results.
// 3. You can only search one tag at a time.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-18
// Name: Delete Behaviors
// Status: Queue
// Tag: #mvp
// Description: Add UI to let users remove
// behaviors from items.
//
// Acceptance:
// 1. Can detach reminders.
// 2. Can detach tags.
// 3. Can detach notes.
// 4. Can detach checklists.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-19
// Name: Update shares
// Status: Queue
// Tag: #mvp
// Description: Ability to add and remove shared
// users.
//
// Acceptance:
// 1. Can share with an additional person.
// 2. Can revoke sharing with a person.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-20
// Name: Sync server data with SQLite
// Status: Queue
// Tag: #mvp
// Description: 
//
// Acceptance:
// 1. Figure out server call to get the necessary
//    data.
// 2. Design tables.
// 3. Build migrations.
// 4. Sync server data with local data.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-21
// Name: Sync SQLite data with server data
// Status: Queue
// Tag: #mvp
// Description: Once user has made an account,
// sync all SQLite data with the server.
//
// Acceptance:
// 1. Sync local data with server data.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-22
// Name: Theme Capability
// Status: Queue
// Tag: #mvp
// Description: The app is capable of theming.
// In this ticket, create a second theme.
//
// Acceptance:
// 1. Create another theme.
// 2. Be able to toggle between themes during
//    the build process.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-23
// Name: Theme Picker
// Status: Queue
// Tag: #mvp
// Description: User can select from a set of
// predefined themes.
//
// Acceptance:
// 1. Create user settings page.
// 2. Setup data on Jexia.
// 3. Setup data on SQLite.
// 4. Display theme created in SD-22.
// 5. Selecting theme updates the interface live.
// 6. Selecting theme persists selection.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-24
// Name: SPIKE: Theme Maker
// Status: Queue
// Tag: #p1
// Description: User can create their own theme.
//
// Acceptance:
// 1. In the user settings page, the user can
//    select a theme to copy to create a new theme.
// 2. They can name it.
// 3. A text area showing all the relevant CSS is
//    shown, with color variables at the top.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-25
// Name: Update Note to rich text
// Status: Queue
// Tag: #p0
// Description: Integrate QuillJS to upgrade
// notes to rich text.
//
// Acceptance:
// 1. User can format their notes with the basics,
//    such as lists, bold, underline, indent, etc.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-26
// Name: Image support for notes
// Status: Queue
// Tag: #p0
// Description: Update QuillJS so that it supports
// uploading images.
//
// Acceptance:
// 1. Images can be uploaded by either putting
//    the data in base64 directly, or uploaded
//    to a file management service such as S3.
// 2. Jexia file upload management integrated.
// 3. Make sure to test offline support.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-27
// Name: Repeating reminders
// Status: Queue
// Tag: #p2
// Description: @TODO
//
// Acceptance:
// 1. @TODO
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-28
// Name: Calendar app integration
// Status: Queue
// Tag: #p3
// Description: Reminders can be pushed as
// calendar events.
//
// Acceptance:
// 1. Create a reminder and download it as .ics
// 2. Integrate with Google calendar
// 3. Integrate with Outlook
// 4. Integrate with iCal
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-31
// Name: Update register email template
// Status: Queue
// Tag: #mvp
// Description: 
//
// Acceptance:
// 1. 
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-32
// Name: Update reset/forget password email
//       templates
// Status: Queue
// Tag: #mvp
// Description: 
//
// Acceptance:
// 1. 
//////////////////////////////////////////////////


**************************************************
**************************************************
**************************************************
**************************************************


//////////////////////////////////////////////////
// Ticket: SD-1
// Name: Scaffold NodeJS application
// Status: Rejected
// Tag: #function
// Description: Setup NodeJS skeleton.
// 
// Acceptance: 
// 1. Render blank page.
// 2. Document approach for authentication.
// 3. Investigate JSON API Token.
//
// Rejection reason: Not needed. Figured out how
// to do it without requiring an API key on the
// front end. UMS auth enables calls without it.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-2
// Name: Render Auth parts of Ionic app
// Status: Rejected
// Tag: #function
// Description: 
//
// Acceptance:
// 1. Renders register and login pages.
//
// Rejection reason: SD-1 rejected.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-3
// Name: Register and login user
// Status: Rejected
// Tag: #function
// Description: Refactor auth and item service
// calls.
// 
// Acceptance:
// 1. Can login and register a user.
// 2. Accepted call redirects to home.
// 3. Can make a request to fetch list of items.
// 4. Home does not necessarily render correctly.
// 
// Rejection reason: SD-1 rejected.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-4
// Name: SPIKE: Investigate session handling
// Status: Rejected
// Tag: #function
// Description: 
//
// Acceptance:
// 1. Session can last for up to two weeks,
//    refreshing when used.
// 2. Does not require localStorage to maintain
//    session.
// 3. Where and how are token/keys stored?
// 
// Rejection reason: SD-1 rejected.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-5
// Name: Connect rest of services to backend
// Status: Rejected
// Tag: #function
// Description: Readjust service calls to call
// NodeJS backend. (I think?)
//
// Acceptance:
// 1. Refactor Item service.
// 2. Refactor Checklist service.
// 3. Refactor Note service.
// 4. Refactor Reminder service.
// 5. Refactor Tag service.
// 
// Rejection reason: SD-1 rejected.
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Ticket: SD-6
// Name: Update NodeJS routes
// Status: Rejected
// Tag: #function
// Description: Get NodeJS backend to properly
// render all client side routes.
//
// Acceptance:
// 1. Can navigate to each available page.
// 
// Rejection reason: SD-1 rejected.
//////////////////////////////////////////////////
