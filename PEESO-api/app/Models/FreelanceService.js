'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FreelanceService extends Model {
    freelancer() {
        return this.hasMany('App/Models/Freelancer');
    }

}

module.exports = FreelanceService
