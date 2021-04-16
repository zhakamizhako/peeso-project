'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Applicant extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }
    keySkills() {
        return this.hasMany('App/Models/ApplicantKeySkill')
    }
    experiences() {
        return this.hasMany('App/Models/ApplicantJobExperience')
    }
    educationalBackground() {
        return this.hasMany('App/Models/ApplicantEducationalBackground')
    }
    uploaded() {
        return this.hasOne('App/Models/FileUpload')
    }
}

module.exports = Applicant
