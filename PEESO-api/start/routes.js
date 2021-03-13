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
  Route.post('/createUser', 'UserController.createUser')
  Route.post('/newToken', 'UserController.sendNewToken')
  Route.post('/verifyToken', 'UserController.verifyToken')
  Route.post('/login', 'UserController.authenticate')
  Route.get('/me', 'UserController.me').middleware(['auth:api'])
}).prefix('v1/user')