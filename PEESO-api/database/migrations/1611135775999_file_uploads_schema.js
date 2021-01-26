'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileUploadsSchema extends Schema {
  up () {
    this.create('file_uploads', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('file_uploads')
  }
}

module.exports = FileUploadsSchema
