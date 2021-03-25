'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndustriesCompanySchema extends Schema {
  up() {
    this.create('industries_companies', (table) => {
      table.increments()
      table.timestamps()
      table.integer('industry_id').unsigned().references('id').inTable('industries')
      table.integer('company_id').unsigned().references('id').inTable('companies')
    })
  }

  down() {
    this.drop('industries_companies')
  }
}

module.exports = IndustriesCompanySchema
