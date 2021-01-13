'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagesSchema extends Schema {
  up() {
    this.create('images', (table) => {
      table.increments()
      table.timestamps()
      table.integer('file_id').references('id').inTable('file_uploads')
      table.integer('user_id').references('id').inTable('users')
    })
  }

  down() {
    this.drop('images')
  }
}

module.exports = ImagesSchema
