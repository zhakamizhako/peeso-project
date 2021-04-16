'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyRatingsSchema extends Schema {
  up() {
    this.create('company_ratings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('header')
      table.text('body')
      table.integer('rating')
      table.boolean('is_archived')
    })
  }

  down() {
    this.drop('company_ratings')
  }
}

module.exports = CompanyRatingsSchema
