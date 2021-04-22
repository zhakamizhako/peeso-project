'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelanceEmployerUploadsSchema extends Schema {
  up () {
    this.create('freelance_employer_uploads', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('freelance_employer_uploads')
  }
}

module.exports = FreelanceEmployerUploadsSchema
