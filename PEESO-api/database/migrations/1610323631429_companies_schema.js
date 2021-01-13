'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompaniesSchema extends Schema {
  up() {
    this.create('companies', (table) => {
      table.increments()
      table.timestamps()
      table.string('company_name').notNullable()
      table.string('industry')
      table.string('address')
      table.string('landline')
      table.string('mobile_phone')
      table.string('website')
      table.integer('min_employees')
      table.integer('max_employees')
      table.text('description', 'longText').notNullable()
      table.integer('image_id').references('id').inTable('images')
      table.float('lat').notNullable()
      table.float('lng').notNullable()
      table.integer('user_id').references('id').inTable('users').notNullable()
    })
  }

  down() {
    this.drop('companies')
  }
}

module.exports = CompaniesSchema

