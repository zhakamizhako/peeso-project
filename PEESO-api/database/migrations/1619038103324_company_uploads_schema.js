'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyUploadsSchema extends Schema {
  up() {
    this.create('company_uploads', (table) => {
      table.increments()
      table.timestamps()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.string('type')
      table.string('file_upload_id')
    })
  }

  down() {
    this.drop('company_uploads')
  }
}

module.exports = CompanyUploadsSchema
