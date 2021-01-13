'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResumeUploadsSchema extends Schema {
  up() {
    this.create('resume_uploads', (table) => {
      table.increments()
      table.timestamps()
      table.integer('file_id').references('id').inTable('file_uploads')
      table.integer('users').references('id').inTable('users')
    })
  }

  down() {
    this.drop('resume_uploads')
  }
}

module.exports = ResumeUploadsSchema
