'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobApplicationsSchema extends Schema {
  up() {
    this.create('job_applications', (table) => {
      table.increments()
      table.timestamps()
      table.integer('job_id').unsigned().references('id').inTable('jobs')
      table.integer('applicant_id').unsigned().references('id').inTable('applicants')
      table.boolean('is_approved')
      table.boolean('is_archived')
      table.string('status')
    })
  }

  down() {
    this.drop('job_applications')
  }
}

module.exports = JobApplicationsSchema
