
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

//////////////////////////////////////////////////
// Ticket: SD-8
// Name: Deploy test iOS app
// Status: Done
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
// Status: Done
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
