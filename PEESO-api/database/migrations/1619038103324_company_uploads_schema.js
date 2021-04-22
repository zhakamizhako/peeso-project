'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyUploadsSchema extends Schema {
  up () {
    this.create('company_uploads', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('company_uploads')
  }
}

module.exports = CompanyUploadsSchema
