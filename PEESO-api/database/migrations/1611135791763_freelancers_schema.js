'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelancersSchema extends Schema {
  up() {
    this.create('freelancers', (table) => {
      // alter table
    })
  }

  down() {
    this.drop('freelancers')
  }
}

module.exports = FreelancersSchema
