'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RatingsSchema extends Schema {
  up() {
    this.create('ratings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').references('id').inTable('users')
      table.integer('job_id').references('id').inTable('jobs')
      table.integer('company_id').references('id').inTable('companies')
      table.string('header')
      table.string('body')
      table.integer('rating') //1-10
    })
  }

  down() {
    this.drop('ratings')
  }
}

module.exports = RatingsSchema
