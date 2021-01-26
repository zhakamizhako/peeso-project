'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApplicantKeySkillsSchema extends Schema {
  up() {
    this.create('applicant_key_skills', (table) => {
      table.increments()
      table.timestamps()
      table.integer("applicant_id").references('id').inTable("applicants")
      table.integer('key_skill_id').references('id').inTable('key_skills')
      table.integer('rating')//0-5
    })
  }

  down() {
    this.drop('applicant_key_skills')
  }
}

module.exports = ApplicantKeySkillsSchema
