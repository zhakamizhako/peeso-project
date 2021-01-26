'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobHighlightsSchema extends Schema {
  up () {
    this.table('job_highlights', (table) => {
      // alter table
    })
  }

  down () {
    this.table('job_highlights', (table) => {
      // reverse alternations
    })
  }
}

module.exports = JobHighlightsSchema
