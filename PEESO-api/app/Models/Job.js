'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Job extends Model {
    benefit() {
        return this.hasMany('App/Models/JobBenefit')
    }
    company() {
        return this.belongsTo('App/Models/Company')
    }
    highlight() {
        return this.hasMany('App/Models/JobHighlight')
    }

}

module.exports = Job
