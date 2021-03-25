'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobApplicationAnswersSchema extends Schema {
  up() {
    this.create('job_application_answers', (table) => {
      table.increments()
      table.timestamps()
      table.integer('job_application_id').unsigned().references('id').inTable('job_applications')
      table.integer('job_application_questions_id').unsigned().references('id').inTable('job_application_questions')
      table.string('answer')
    })
  }

  down() {
    this.drop('job_application_answers')
  }
}

module.exports = JobApplicationAnswersSchema
