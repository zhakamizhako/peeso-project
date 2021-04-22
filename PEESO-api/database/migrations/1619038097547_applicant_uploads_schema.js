'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApplicantUploadsSchema extends Schema {
  up () {
    this.create('applicant_uploads', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('applicant_uploads')
  }
}

module.exports = ApplicantUploadsSchema
