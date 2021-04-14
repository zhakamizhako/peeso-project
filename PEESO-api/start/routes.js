'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Route.group(()=>{
//   Route.post('/', )
// }).prefix('v1/login')

Route.group(() => {
  Route.post('/createApplicant', 'UserController.createApplicant')
  Route.post('/createCompany', 'UserController.createCompany')
  Route.post('/createUser', 'UserController.createUser')
  Route.post('/newOTP', 'UserController.sendNewToken')
  Route.post('/verifyOTP', 'UserController.verifyToken')
}).prefix('v1/user')

Route.group(() => {
  Route.get('/', 'JobController.getJobs').middleware(['auth:api'])
  Route.post('/save/:id', 'JobController.saveJob').middleware(['auth:api'])
  Route.post('/unsave/:id', 'JobController.unsaveJob').middleware(['auth:api'])
  Route.get('/getsaved/', 'JobController.getSavedJobs').middleware(['auth:api'])
  Route.get('/:id', 'JobController.getJob').middleware(['auth:api'])
}).prefix('v1/jobs')

Route.group(() => {
  Route.post('/login', 'UserController.authenticate')
  Route.get('/me', 'UserController.me').middleware(['auth:api'])
}).prefix('v1/auth')