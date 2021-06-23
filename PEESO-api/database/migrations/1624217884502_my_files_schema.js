'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MyFilesSchema extends Schema {
  up() {
    this.create('my_files', (table) => {
      table.increments()
      table.timestamps()
      table.integer('file_id').unsigned().references('id').inTable('file_uploads')
      table.string('type')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.bool('is_approved')
      table.bool('is_rejected')
      table.string('status')
      table.string('remarks')
    })
  }

  down() {
    this.drop('my_files')
  }
}

module.exports = MyFilesSchema
