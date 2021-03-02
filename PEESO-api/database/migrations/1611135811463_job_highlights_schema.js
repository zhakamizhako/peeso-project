'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobHighlightsSchema extends Schema {
  up() {
    this.create('job_highlights', (table) => {
      table.increments()
      table.timestamps()
      // alter table
    })
  }

  down() {
    this.table('job_highlights', (table) => {
      // reverse alternations
    })
  }
}

module.exports = JobHighlightsSchema
