'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileUploadsSchema extends Schema {
  up() {
    this.create('file_uploads', (table) => {
      table.increments()
      table.timestamps()
      table.string('filename')
      table.text('path')
      table.string('type')
      table.integer('uploaded_by').unsigned().references('id').inTable('users')
    })
  }

  down() {
    this.drop('file_uploads')
  }
}

module.exports = FileUploadsSchema
