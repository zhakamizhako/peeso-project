'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VerificationsSchema extends Schema {
  up() {
    this.create('verifications', (table) => {
      table.increments()
      table.timestamps()
      table.integer("user_id").unsigned().references("id").inTable("users")
      table.string("otp_code")
      table.datetime('expiry')
    })
  }

  down() {
    this.drop('verifications')
  }
}

module.exports = VerificationsSchema
