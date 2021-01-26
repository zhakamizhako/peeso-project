'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up() {
    this.table('profiles', (table) => {
      table.string("first_name").notNullable()
      table.string("middle_name")
      table.string("last_name").notNullable()
    })
  }

  down() {

    this.table('profiles', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ProfilesSchema
