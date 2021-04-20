'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class JobCategory extends Model {
    jobs() {
        return this.hasMany('App/Models/Job')
    }
}

module.exports = JobCategory
