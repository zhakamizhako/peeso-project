'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelanceServicesSchema extends Schema {
  up() {
    this.create('freelance_services', (table) => {
      table.increments()
      table.timestamps()
      // alter table
    })
  }

  down() {
    this.table('freelance_services', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FreelanceServicesSchema
