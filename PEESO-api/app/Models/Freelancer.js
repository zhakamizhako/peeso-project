'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Freelancer extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }
    category() {
        return this.belongsTo('App/Models/FreelanceService')
    }
    ratings() {
        return this.hasMany('App/Models/Rating')
    }
    bookings() {
        return this.hasMany('App/Models/FreelanceBooking')
    }
}

module.exports = Freelancer
