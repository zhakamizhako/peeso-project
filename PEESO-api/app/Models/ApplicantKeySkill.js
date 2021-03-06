'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ApplicantKeySkill extends Model {
    name() {
        return this.belongsTo('App/Models/KeySkill')
    }
}

module.exports = ApplicantKeySkill
