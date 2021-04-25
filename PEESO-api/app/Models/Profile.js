'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
    picture(){
        return this.belongsTo('App/Models/FileUpload', 'profile_pic')
    }
}

module.exports = Profile
