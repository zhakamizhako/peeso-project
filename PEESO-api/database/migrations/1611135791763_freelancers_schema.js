'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelancersSchema extends Schema {
  up () {
    this.table('freelancers', (table) => {
      // alter table
    })
  }

  down () {
    this.table('freelancers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FreelancersSchema
