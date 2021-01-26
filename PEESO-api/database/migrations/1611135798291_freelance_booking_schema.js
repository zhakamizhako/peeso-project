'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelanceBookingSchema extends Schema {
  up () {
    this.table('freelance_bookings', (table) => {
      // alter table
    })
  }

  down () {
    this.table('freelance_bookings', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FreelanceBookingSchema
