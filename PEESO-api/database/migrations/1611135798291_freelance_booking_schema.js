'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreelanceBookingSchema extends Schema {
  up() {
    this.create('freelance_bookings', (table) => {
      table.increments()
      table.timestamps()
      table.integer('freelancer_id').unsigned().references('id').inTable('freelancers')
      table.datetime('booking_date')
      table.datetime('work_from')
      table.datetime('work_to')
      table.string('location')
      table.float('lat')
      table.float('lng')
      table.string('contact_person')
      table.string('contact_no')
      table.integer('booked_by').unsigned().references('id').inTable('freelance_employers')
      table.text('details')
      table.boolean('is_approved')
      table.boolean('is_done')
      table.boolean('is_archived')

      // alter table
    })
  }

  down() {
    this.drop('freelance_bookings')
  }
}

module.exports = FreelanceBookingSchema
