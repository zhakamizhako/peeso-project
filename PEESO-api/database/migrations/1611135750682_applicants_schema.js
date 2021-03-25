'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApplicantsSchema extends Schema {
  up() {
    this.create('applicants', (table) => {
      table.increments()
      table.timestamps()
      table.integer("user_id").unsigned().references('id').inTable('users')
      table.text('opening_statement', 'longtext')
      table.string("first_name")
      table.string("middle_name")
      table.string("last_name")
      table.string("address")
      table.string("contact_no")
      table.string("email")
      table.string("expected_salary")
    })
  }

  down() {
    this.drop('applicants')
  }
}

module.exports = ApplicantsSchema
