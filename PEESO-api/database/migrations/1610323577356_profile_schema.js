'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up() {
    this.create('profiles', (table) => {
      table.increments()
      table.timestamps()
      table.string('first_name')
      table.string('middle_name')
      table.string('last_name')
      table.date('date_of_birth')
      table.text('address', 'longText')
      table.string('mobile_phone')
      table.string('home_phone')
      table.integer('user_id').references('id').inTable('users')
    })
  }

  down() {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
