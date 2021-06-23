'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up() {
    this.create('notifications', (table) => {
      table.increments()
      table.timestamps()
      table.text("body", "longtext")
      table.integer('file_id').unsigned().references('id').inTable('file_uploads')
      table.integer('user_id').references('id').inTable('users')
      table.string('type')
    })
  }

  down() {
    this.drop('notifications')
  }
}

module.exports = NotificationsSchema
