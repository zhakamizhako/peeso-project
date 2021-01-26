'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobBenifitsSchema extends Schema {
  up () {
    this.create('job_benifits', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('job_benifits')
  }
}

module.exports = JobBenifitsSchema
