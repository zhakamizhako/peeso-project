'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobsSchema extends Schema {
  up() {
    this.create('jobs', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.datetime('deadline')
      table.string('status')
      table.boolean('hidden')
      table.boolean('is_approved')
      table.boolean('is_archived')
      table.datetime('archived_on')
      table.datetime('approved_on')
      table.text('job_description')

      // alter table
    })
  }

  down() {
    this.drop('jobs')
  }
}

module.exports = JobsSchema
