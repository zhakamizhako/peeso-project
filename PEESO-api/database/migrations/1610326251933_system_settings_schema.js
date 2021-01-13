'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SystemSettingsSchema extends Schema {
  up() {
    this.create('system_settings', (table) => {
      table.increments()
      table.timestamps()
      table.text("terms", "longtext")
      table.text("pivacy", 'longtext')
      table.text('about', 'longtext')
    })
  }

  down() {
    this.drop('system_settings')
  }
}

module.exports = SystemSettingsSchema
