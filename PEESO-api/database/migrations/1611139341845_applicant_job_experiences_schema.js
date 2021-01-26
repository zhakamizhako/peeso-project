'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApplicantJobExperiencesSchema extends Schema {
  up() {
    this.create('applicant_job_experiences', (table) => {
      table.increments()
      table.timestamps()
      table.integer("applicant_id").references("id").inTable("applicants")
      table.date("date_start")
      table.date("date_end")
      table.string("role")
    })
  }

  down() {
    this.drop('applicant_job_experiences')
  }
}

module.exports = ApplicantJobExperiencesSchema
