'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobCategoriesSchema extends Schema {
  up() {
    this.create('job_categories', (table) => {
      table.increments()
      table.timestamps()
      table.string("name")
    })
  }

  down() {
    this.drop('job_categories')
  }
}

module.exports = JobCategoriesSchema
