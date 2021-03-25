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

class CompanyJobSeeder {
  async run() {
    await Database.table('users').insert([{ username: 'Dummy1', password: 'abcd', email: 'abcd@1234', type: null, is_verified: true }])
    await Database.table('companies').insert([{ user_id: 1, name: "El Racho", address: "Dummy address st, dummy address bldg, dummy address phase, dummy address city", contact_no: "1234567890", email: "abcd@1234", vision: "lorem ipsum vision", mission: "lorem ipsum mission", development_thrusts: "lorem ipsum development thrusts", type: "Private", employees_min: 5, employees_max: 20 }])
    await Database.table('company_core_values').insert([
      { company_id: 1, text: "ABCD" },
      { company_id: 1, text: "EFGH" },
      { company_id: 1, text: "IJKL" },
      { company_id: 1, text: "MNOP" },
    ])
  }
}

module.exports = CompanyJobSeeder
