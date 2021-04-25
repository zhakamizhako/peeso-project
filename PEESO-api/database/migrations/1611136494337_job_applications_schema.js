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
      table.string('first_name')
      table.string('middle_name')
      table.string('last_name')
      table.string('email')
      table.string('contact_no')
      table.boolean('is_approved')
      table.boolean('is_archived')
      table.string('status')
      table.integer('file_id').unsigned().references('id').inTable('file_uploads')
    })
  }

  down() {
    this.drop('job_applications')
  }
}

module.exports = JobApplicationsSchema
