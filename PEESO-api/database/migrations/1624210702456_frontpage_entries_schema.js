'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FrontpageEntriesSchema extends Schema {
  up() {
    this.create('frontpage_entries', (table) => {
      table.increments()
      table.timestamps()
      table.text("body", "longtext")
      table.text("header", "longtext")
      table.integer('file_id').unsigned().references('id').inTable('file_uploads') //for cover
      table.text('redirect_url', 'longtext')
    })
  }

  down() {
    this.drop('frontpage_entries')
  }
}

module.exports = FrontpageEntriesSchema
