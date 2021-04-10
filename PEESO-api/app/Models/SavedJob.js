'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SavedJob extends Model {
    job() {
        return this.belongsTo('App/Models/Job')
    }
    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = SavedJob
