'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up() {
    this.create('profiles', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string("first_name").notNullable()
      table.string("middle_name")
      table.string("last_name").notNullable()
      table.boolean("is_company")
    })
  }

  down() {
    this.drop('profiles')
  }
}

module.exports = ProfilesSchema
