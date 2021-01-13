'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppliedJobsSchema extends Schema {
  up() {
    this.create('applied_jobs', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').references('id').inTable('users')
      table.integer('job_id').references('id').inTable('jobs')
    })
  }

  down() {
    this.drop('applied_jobs')
  }
}

module.exports = AppliedJobsSchema
