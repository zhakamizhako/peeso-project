'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelanceServicesSchema extends Schema {
  up() {
    this.create('freelance_services', (table) => {
      table.increments()
      table.timestamps()
      table.string("name")
      table.float("min_estimate")
      table.float("max_estimate")
      // alter table
    })
  }

  down() {
    this.drop('freelance_services')
  }
}

module.exports = FreelanceServicesSchema
