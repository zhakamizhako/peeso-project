'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobApplicationsSchema extends Schema {
  up () {
    this.create('job_applications', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('job_applications')
  }
}

module.exports = JobApplicationsSchema
