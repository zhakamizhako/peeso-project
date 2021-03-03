'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobsSchema extends Schema {
  up() {
    this.create('jobs', (table) => {
      table.increments()
      table.timestamps()
      // alter table
    })
  }

  down() {
    this.drop('jobs')
  }
}

module.exports = JobsSchema
