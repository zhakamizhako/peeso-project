'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class JobApplication extends Model {
    job() {
        return this.belongsTo('App/Models/Job')
    }
    applicant() {
        return this.belongsTo('App/Models/Applicant')
    }
}

module.exports = JobApplication
