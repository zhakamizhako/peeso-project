'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobsSchema extends Schema {
  up() {
    this.create('jobs', (table) => {
      table.increments()
      table.timestamps()
      table.string('job_title').notNullable()
      table.text('description', 'longtext')
      table.integer('positions')
      table.string('type')
      table.double('salary_min')
      table.double('salary_max')
      table.string('city')
      table.integer('company_id').references('id').inTable('companies')
      table.string('status')
    })
  }

  down() {
    this.drop('jobs')
  }
}

module.exports = JobsSchema
