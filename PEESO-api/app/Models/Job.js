'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Job extends Model {
    benefits() {
        return this.hasMany('App/Models/JobBenefit')
    }
    company() {
        return this.belongsTo('App/Models/Company')
    }
    highlight() {
        return this.hasMany('App/Models/JobHighlight')
    }
    category() {
        return this.belongsTo('App/Models/JobCategory', 'category_id')
    }
    questions() {
        return this.hasMany('App/Models/JobApplicationQuestion')
    }


}

module.exports = Job
