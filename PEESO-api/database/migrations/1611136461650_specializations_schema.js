'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpecializationsSchema extends Schema {
  up() {
    this.create('specializations', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down() {
    this.drop('specializations')
  }
}

module.exports = SpecializationsSchema
