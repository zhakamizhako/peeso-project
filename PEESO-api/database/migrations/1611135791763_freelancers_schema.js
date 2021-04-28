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
      table.float('price_min')
      table.float('price_max')
      table.boolean('is_available')
      table.text("job_experience")
      table.string('email')
      table.string('contact_no')
      table.integer('profile_pic').unsigned().references('id').inTable('file_uploads')
    })
  }

  down() {
    this.drop('freelancers')
  }
}

module.exports = FreelancersSchema
