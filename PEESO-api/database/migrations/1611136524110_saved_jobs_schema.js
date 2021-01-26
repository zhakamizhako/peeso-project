'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SavedJobsSchema extends Schema {
  up () {
    this.create('saved_jobs', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('saved_jobs')
  }
}

module.exports = SavedJobsSchema
