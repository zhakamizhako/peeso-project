'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SkillJobsSchema extends Schema {
  up() {
    this.create('skill_jobs', (table) => {
      table.increments()
      table.timestamps()
      table.integer('skill_id').references('id').inTable('skill_types')
      table.integer('job_id').references('id').inTable('jobs')
    })
  }

  down() {
    this.drop('skill_jobs')
  }
}

module.exports = SkillJobsSchema
