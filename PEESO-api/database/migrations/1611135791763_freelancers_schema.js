'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelancersSchema extends Schema {
  up() {
    this.create('freelancers', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('freelance_service_id').unsigned().references('id').inTable('freelance_services')
      table.boolean('is_available')

    })
  }

  down() {
    this.drop('freelancers')
  }
}

module.exports = FreelancersSchema
