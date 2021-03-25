'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobHighlightsSchema extends Schema {
  up() {
    this.create('job_highlights', (table) => {
      table.increments()
      table.timestamps()
      table.integer('job_id').unsigned().references('id').inTable('jobs')
      table.string('description')
    })
  }

  down() {
    this.drop('job_highlights')
  }
}

module.exports = JobHighlightsSchema
