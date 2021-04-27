'use strict'
const User = use('App/Models/User')
class EasyServiceController {

    async markReady({ auth, response }) {

        try {

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }

    }

    async markNotReady({ auth, response }) {

        try {

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }

    }

    async updateProfile({ request, auth, response }) {
        let {
            photo,
            filetype,
            firstname,
            middlename,
            lastname,
            skills
        } = request.all()


        try {

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async updateEmployerProfile({ request, auth, response }) {
        let {
            photo,
            filetype,
            photoHouse,
            filetypeHouse,
            firstname,
            middlename,
            lastname,
        } = request.all()

        try {

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async book({ request, auth, response }) {


        try {

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async confirmBoo({ request, response }) {

        try {

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }


}

module.exports = EasyServiceController
