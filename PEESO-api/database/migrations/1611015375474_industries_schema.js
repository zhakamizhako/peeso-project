'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndustriesSchema extends Schema {
  up() {
    this.create('industries', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
    })
  }

  down() {
    this.drop('industries')
  }
}

module.exports = IndustriesSchema
