'use strict'

/*
|--------------------------------------------------------------------------
| CompanyJobSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const Hash = use('Hash')

class CompanyJobSeeder {
  async run() {
    await Database.table('users').insert([{ username: 'Dummy1', password: await Hash.make('12345'), email: 'abcd@1234', type: 'normal', is_verified: true }])
    await Database.table('users').insert([{ username: 'dummy2', password: await Hash.make('12345'), email: 'solon.rolandkimandre@gmail.com', type: 'normal', is_verified: true }])
    await Database.table('profiles').insert([{ first_name: "Roland Kim Andre", middle_name: "Gallego", last_name: "Solon", user_id: 2 }])
    await Database.table('applicants').insert([{
      user_id: 2,
      opening_statement: 'Lorem Ipsum Opening Statement',
      first_name: 'Roland Kim Andre',
      middle_name: 'Gallego',
      last_name: 'Solon',
      address: "Blk74 Lot 16 Phase 3, Emily homes, Cabantian, Davao City",
      contact_no: "09232901913",
      email: "solon.rolandkimandre@gmail.com",
    }])
    await Database.table('companies').insert([{ user_id: 1, name: "El Racho", address: "Dummy address st, dummy address bldg, dummy address phase, dummy address city", contact_no: "1234567890", email: "abcd@1234", vision: "lorem ipsum vision", mission: "lorem ipsum mission", development_thrusts: "lorem ipsum development thrusts", type: "Private", employees_min: 5, employees_max: 20 }])
    await Database.table('company_core_values').insert([
      { company_id: 1, text: "ABCD" },
      { company_id: 1, text: "EFGH" },
      { company_id: 1, text: "IJKL" },
      { company_id: 1, text: "MNOP" },
    ])
    await Database.table('jobs').insert([
      {
        company_id: 1,
        name: 'Sample Job 1',
        job_description: "wtf",
        salary: "5000",
        deadline: new Date(),
        salary_included_benefits: true,
        work_from: new Date(),
        work_to: new Date(),
        is_approved: true,
        category: "Private",
        status: "Verified and hired applicants through P-App"
      }
    ])
    await Database.table('job_benefits').insert([
      { job_id: 1, benefit: "GSIS" },
      { job_id: 1, benefit: "Philhealth" },
      { job_id: 1, benefit: "Pag-Ibig" },
    ])
  }
}

module.exports = CompanyJobSeeder