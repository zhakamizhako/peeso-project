'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table
        .enum("type", ["google", "normal"])
        .notNullable()
        .defaultTo("normal");
      // table.string('user_type')
      table.bool('is_verified')
      table.datetime('expiry')
      table.string("status") // ?
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema 
