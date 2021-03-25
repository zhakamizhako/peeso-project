'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyCoreValuesSchema extends Schema {
  up() {
    this.create('company_core_values', (table) => {
      table.increments()
      table.timestamps()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.text("text")
    })
  }

  down() {
    this.drop('company_core_values')
  }
}

module.exports = CompanyCoreValuesSchema
