'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelanceBookingSchema extends Schema {
  up() {
    this.create('freelance_bookings', (table) => {
      table.increments()
      table.timestamps()
      // alter table
    })
  }

  down() {
    this.table('freelance_bookings', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FreelanceBookingSchema
