'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApplicantEducationalBackgroundsSchema extends Schema {
  up() {
    this.create('applicant_educational_backgrounds', (table) => {
      table.increments()
      table.timestamps()
      table.string("name")
      table.string("course")
      table.date("date_start")//probably by year
      table.date("date_end")//probably by year
    })
  }

  down() {
    this.drop('applicant_educational_backgrounds')
  }
}

module.exports = ApplicantEducationalBackgroundsSchema
