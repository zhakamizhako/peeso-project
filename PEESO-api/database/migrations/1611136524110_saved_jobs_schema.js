'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SavedJobsSchema extends Schema {
  up() {
    this.create('saved_jobs', (table) => {
      table.increments()
      table.timestamps()
      table.integer('job_id').unsigned().references('id').inTable('jobs')
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down() {
    this.drop('saved_jobs')
  }
}

module.exports = SavedJobsSchema
