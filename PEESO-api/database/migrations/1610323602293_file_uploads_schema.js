'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileUploadsSchema extends Schema {
  up() {
    this.create('file_uploads', (table) => {
      table.increments()
      table.timestamps()
      table.text('file_path', 'longText')
      table.string('filename')
      table.string('filetype')
      table.integer('user_id').references('id').inTable('users')
    })
  }

  down() {
    this.drop('file_uploads')
  }
}

module.exports = FileUploadsSchema
