'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SkillUsersSchema extends Schema {
  up() {
    this.create('skill_users', (table) => {
      table.increments()
      table.timestamps()
      table.integer('skill_id').references('id').inTable('skill_types')
      table.integer('user_id').references('id').inTable('users')
    })
  }

  down() {
    this.drop('skill_users')
  }
}

module.exports = SkillUsersSchema
