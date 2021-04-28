'use strict'
const User = use('App/Models/User')
const Service = use('App/Models/FreelanceService')
const Freelancer = use('App/Models/Freelancer')
const { HttpException } = use("node-exceptions");
class EasyServiceController {

    async getTypes({ response }) {
        try {
            let d = await Service.query().fetch()

            response.send({ data: d })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }


    async getAvailablePersonnel({ params, response }) {
        let { id } = params
        try {
            let d = await Freelancer.query().where('freelance_service_id', id).with('user.profile.picture').with('category').with('ratings').fetch()

            response.send({ data: d })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getPersonData({ params, response }) {
        let { id } = params
        try {
            let d = await Freelancer.query().where('id', id).with('user.profile.picture').with('category').with('ratings').fetch()

            response.send({ data: d })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async updateProfile({ request, auth, response }) {
        let {
            category,
            price_min,
            price_max,
            is_available,
            job_experience,
            email,
            contact_no
        } = request.all()

        let { id } = auth.user

        try {
            let b = await Freelancer.findOrCreate({ user_id: id })

            b.freelance_service_id = category
            b.price_min = price_min
            b.price_max = price_max
            b.is_available = is_available
            b.job_experience = job_experience
            b.email = email
            b.contact_no = contact_no
            b.user_id = id

            await b.save()

            response.send({ data: b })

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
            email,
            contact_no
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

    async confirmBook({ request, response }) {

        try {

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }


}

module.exports = EasyServiceController
