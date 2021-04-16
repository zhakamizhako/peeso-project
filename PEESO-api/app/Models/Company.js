'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
    ratings() {
        return this.hasMany('App/Models/CompanyRating')
    }
}

module.exports = Company
