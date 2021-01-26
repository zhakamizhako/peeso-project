'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobApplicationAnswersSchema extends Schema {
  up () {
    this.create('job_application_answers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('job_application_answers')
  }
}

module.exports = JobApplicationAnswersSchema
