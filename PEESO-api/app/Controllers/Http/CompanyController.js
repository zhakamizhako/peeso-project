'use strict'
const Company = use('App/Models/Company')
const HttpResponse = use('App/Controllers/Http/HttpResponse')
const { HttpException } = use("node-exceptions");
class CompanyController {
    async getCompanies({ response }) {
        try {
            let jobs = (await Company.query().orderBy('updated_at', 'DESC').with('ratings.user.profile').fetch()).toJSON()
            response.send({ data: jobs })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getCompany({ params, response }) {
        let { id } = params
        try {
            let cdata = await Company.query().where('id', id).with('ratings').fetch()
            response.send({ data: (await cdata.toJSON())[0] })

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async updateCompany({ request, response }) {
        try {

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }
}

module.exports = CompanyController
