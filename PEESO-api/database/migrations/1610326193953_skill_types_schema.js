'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SkillTypesSchema extends Schema {
  up() {
    this.create('skill_types', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
    })
  }

  down() {
    this.drop('skill_types')
  }
}

module.exports = SkillTypesSchema
