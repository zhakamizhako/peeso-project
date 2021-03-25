'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobBenefitsSchema extends Schema {
  up() {
    this.create('job_benefits', (table) => {
      table.increments()
      table.timestamps()
      table.integer("job_id").unsigned().references('id').inTable('jobs')
      table.string("benefit")
    })
  }

  down() {
    this.drop('job_benefits')
  }
}

module.exports = JobBenefitsSchema
