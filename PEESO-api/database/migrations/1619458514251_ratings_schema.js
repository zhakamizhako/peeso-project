'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RatingsSchema extends Schema {
  up() {
    this.create('ratings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('applicant_id').unsigned().references('id').inTable('applicants')
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.integer('freelancer_id').unsigned().references('id').inTable('companies')
      table.text('body')
      table.string('title')
      table.integer('profile_id').unsigned().references('id').inTable('profiles')
      table.integer('rating')
    })
  }

  down() {
    this.drop('ratings')
  }
}

module.exports = RatingsSchema
