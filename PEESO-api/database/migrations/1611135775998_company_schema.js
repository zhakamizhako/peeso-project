'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up() {
    this.create('companies', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name')
      table.string('address')
      table.string('contact_no')
      table.string('email')
      table.text('vision')
      table.text('mission')
      table.text('core_values')
      table.text('development_thrusts')
      table.string('type')
      table.integer('employees_min')
      table.integer('employees_max')
      table.double('lat')
      table.double('lng')
      table.string('salary')
      // alter table
    })
  }

  down() {
    this.drop('companies')
  }
}

module.exports = CompanySchema
