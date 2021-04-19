'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BenefitNamesSchema extends Schema {
  up () {
    this.create('benefit_names', (table) => {
      table.increments()
      table.timestamps()
      table.string("name")
    })
  }

  down () {
    this.drop('benefit_names')
  }
}

module.exports = BenefitNamesSchema
