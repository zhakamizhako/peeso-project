'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class JobBenefit extends Model {
    name() {
        return this.belongsTo('App/Models/BenefitName', 'benefit_id')
    }
}

module.exports = JobBenefit
