'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KeySkillsSchema extends Schema {
  up() {
    this.create('key_skills', (table) => {
      table.increments()
      table.timestamps()
      table.string("skill_name")
    })
  }

  down() {
    this.drop('key_skills')
  }
}

module.exports = KeySkillsSchema
