'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyVerificationSchema extends Schema {
  up () {
    this.create('company_verifications', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('company_verifications')
  }
}

module.exports = CompanyVerificationSchema
