'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApplicantUploadsSchema extends Schema {
  up() {
    this.create('applicant_uploads', (table) => {
      table.increments()
      table.timestamps()
      table.integer('applicant_id').unsigned().references('id').inTable('applicants')
      table.string('type')
      table.string('file_upload_id')
    })
  }

  down() {
    this.drop('applicant_uploads')
  }
}

module.exports = ApplicantUploadsSchema
