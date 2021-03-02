'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up() {
    this.create('companies', (table) => {
      table.increments()
      table.timestamps()
      // alter table
    })
  }

  down() {
    this.table('companies', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CompanySchema
