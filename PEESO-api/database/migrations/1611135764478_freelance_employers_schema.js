'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelanceEmployersSchema extends Schema {
  up() {
    this.table('freelance_employers', (table) => {
      table.integer("user_id").references('id').inTable('users')
      //Below should be optional but oh well.
      table.string("first_name")
      table.string("middle_name")
      table.string("last_name")
      table.string("address")
      table.string("contact_no")
      table.string("email")
    })
  }

  down() {
    this.table('freelance_employers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FreelanceEmployersSchema