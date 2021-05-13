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
  Route.get('/types', 'EasyServiceController.getTypes').middleware(['auth:api'])
  Route.post('/book', 'EasyServiceController.book').middleware(['auth:api'])
  Route.get('/getPersonData/:id', 'EasyServiceController.getPersonData').middleware(['auth:api'])
  Route.post('/updateProfile', 'EasyServiceController.updateProfile').middleware(['auth:api'])
  Route.get('/getAvailablePersonnel/:id', 'EasyServiceController.getAvailablePersonnel').middleware(['auth:api'])

}).prefix('v1/easyservice')

Route.group(() => {
  Route.post('/createApplicant', 'UserController.createApplicant')
  Route.post('/createFreelance', 'UserController.createFreelanceEmployer')
  Route.post('/createCompany', 'UserController.createCompany')
  Route.post('/createUser', 'UserController.createUser')
  Route.post('/newOTP', 'UserController.sendNewToken')
  Route.post('/verifyOTP', 'UserController.verifyToken')
  Route.post('updateprofilepic', 'UserController.uploadProfilePic').middleware(['auth:api'])
}).prefix('v1/user')

Route.group(() => {
  Route.get('/', 'JobController.getJobs').middleware(['auth:api'])
  Route.get('/company/:id', 'JobController.getJobByCompany').middleware(['auth:api'])
  Route.post('/save/:id', 'JobController.saveJob').middleware(['auth:api'])
  Route.post('/unsave/:id', 'JobController.unsaveJob').middleware(['auth:api'])
  Route.get('/getsaved/', 'JobController.getSavedJobs').middleware(['auth:api'])
  Route.get('/getBenefits/', 'JobController.getBenefits').middleware(['auth:api'])
  Route.post('/new', 'JobController.newJob').middleware(['auth:api'])
  Route.post('/update', 'JobController.update').middleware(['auth:api'])
  Route.post('/close', 'JobController.close').middleware(['auth:api'])
  Route.post('/apply', 'JobController.applyJob').middleware(['auth:api'])
  Route.get('/getInfo/:id', 'JobController.getJobQuestions').middleware(['auth:api'])
  Route.post('/cancelapply', 'JobController.cancelapply').middleware(['auth:api'])
  Route.get('/myApplications', 'JobController.myApplications').middleware(['auth:api'])
  Route.get('/category/:id', 'JobController.getJobsByCategoryId').middleware(['auth:api'])
  Route.get('/:id', 'JobController.getJob').middleware(['auth:api'])
}).prefix('v1/jobs')

Route.group(() => {
  Route.get('/', 'CompanyController.getCompanies').middleware(['auth:api'])
  Route.get('/:id', 'CompanyController.getCompany').middleware(['auth:api'])
  Route.post('/edit', 'CompanyController.updateCompany').middleware(['auth:api'])
}).prefix('v1/companies')

Route.group(() => {
  Route.post('/login', 'UserController.authenticate')
  Route.get('/me', 'UserController.me').middleware(['auth:api'])
}).prefix('v1/auth')
