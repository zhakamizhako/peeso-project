'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobsSchema extends Schema {
  up() {
    this.create('jobs', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.datetime('deadline')
      table.string('status')
      table.boolean('hidden')
      table.boolean('is_approved')
      table.boolean('is_archived')
      table.datetime('archived_on')
      table.datetime('approved_on')
      table.text('job_description')
      table.datetime('work_from')
      table.datetime('work_to')
      table.float('lat')
      table.float('lng')
      table.string("location")
      table.string('salary')
      table.boolean('salary_included_benefits')
      table.integer('company_id').unsigned().references('id').inTable('companies').notNull()
      table.integer('category_id').unsigned().references('id').inTable('job_categories')

      // alter table
    })
  }

  down() {
    this.drop('jobs')
  }
}

module.exports = JobsSchema
