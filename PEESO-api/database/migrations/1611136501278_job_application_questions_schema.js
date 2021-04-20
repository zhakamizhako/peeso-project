'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobApplicationQuestionsSchema extends Schema {
  up() {
    this.create('job_application_questions', (table) => {
      table.increments()
      table.timestamps()
      table.string('question')
      table.integer('job_id').unsigned().references('id').inTable('jobs')
      table.integer('type')
    })
  }

  down() {
    this.drop('job_application_questions')
  }
}

module.exports = JobApplicationQuestionsSchema
